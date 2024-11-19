import express, { Response, Request } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotels, { HotelType } from "../models/hotels";
import validateToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// /api/my-hotels
router.post(
  "/",
  validateToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities is required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //1. upload the image cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        try {
          const b64 = Buffer.from(image.buffer).toString("base64");
          let dataURI = "data:" + image.mimetype + ";base64," + b64;
          const res = await cloudinary.v2.uploader.upload(dataURI);
          return res.url;
        } catch (err) {
          console.error("Cloudinary upload error:", err);
          throw new Error("Cloudinary upload failed");
        }
      });
      
      //2. if upload was successful, add the URL to the new hotel
      const imageUrls = await Promise.all(uploadPromises);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //3.save the new hotel in database
      const hotel = new Hotels(newHotel);
      await hotel.save();

      //4. return a 201 status
      res.status(201).json({ message: "Added new hotel successfully", hotel });
    } catch (error) {
      console.log("Error creating hotel :", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// /api/my-hotels/list
router.get(
  "/list", validateToken, async (req: Request, res: Response) => {
    try {
      const hotels = await Hotels.find({ userId: req.userId });
      if (hotels.length === 0) {
        return res.status(404).json({ message: "No hotels found for this user." });
      }
      res.status(200).json({ hotels });
    } catch (error) {
      console.log("Error fetching hotels:", error);
      res.status(500).json({ message: "Something went wrong while fetching hotels." });
    }
  }
);
export default router;
