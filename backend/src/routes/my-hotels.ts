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
      //1. upload the image cloudinary
      //2. if upload was successful, add the URL to the new hotel
      //3.save the new hotel in database
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

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
router.get("/list", validateToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotels.find({ userId: req.userId });
    if (hotels.length === 0) {
      return res
        .status(201)
        .json({ message: "No hotels found for this user." });
    }
    res.status(201).json({ hotels });
  } catch (error) {
    console.log("Error fetching hotels:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching hotels." });
  }
});

// api/my-hotels/list/:hotelId GET
router.get(
  "/list/:hotelId",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const { hotelId } = req.params;
      const hotel = await Hotels.findOne({ _id: hotelId, userId: req.userId });
      if (!hotel) {
        return res
          .status(404)
          .json({ message: "Hotel not found or you don't have access to it" });
      }

      res.status(201).json({ hotel });
    } catch (error) {
      console.log("Error fetching hotels:", error);
      res.status(500).json({
        message: "Something went wrong while fetching hotel details.",
      });
    }
  }
);

// api/my-hotels/list/:hotelId PUT
router.put(
  "/list/:hotelId",
  validateToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotels.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res
          .status(404)
          .json({ message: "Hotel not found or you don't have access to it" });
      }
      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];
      await hotel.save();
      res.status(201).json({ hotel });
    } catch (error) {
      console.log("Error fetching hotels:", error);
      res.status(500).json({
        message: "Something went wrong while updating hotel details.",
      });
    }
  }
);

// api/my-hotels/list/:hotelId DELETE
router.delete(
  "/list/:hotelId",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const hotel = await Hotels.findOneAndDelete(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
      );

      if (!hotel) {
        return res
          .status(404)
          .json({ message: "Hotel not found or you don't have access to it" });
      }
      return res.sendStatus(200);
    } catch (error) {
      console.log("Error fetching hotels:", error);
      res.status(500).json({
        message: "Something went wrong while updating hotel details.",
      });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
