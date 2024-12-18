"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotels_1 = __importDefault(require("../models/hotels"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});
// /api/my-hotels
router.post("/", auth_1.default, [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Type is required"),
    (0, express_validator_1.body)("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    (0, express_validator_1.body)("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities is required"),
], upload.array("imageFiles", 6), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //1. upload the image cloudinary
        //2. if upload was successful, add the URL to the new hotel
        //3.save the new hotel in database
        const imageFiles = req.files;
        const newHotel = req.body;
        const imageUrls = yield uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const hotel = new hotels_1.default(newHotel);
        yield hotel.save();
        //4. return a 201 status
        res.status(201).json({ message: "Added new hotel successfully", hotel });
    }
    catch (error) {
        console.log("Error creating hotel :", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
// /api/my-hotels/list
router.get("/list", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotels_1.default.find({ userId: req.userId });
        if (hotels.length === 0) {
            return res
                .status(201)
                .json({ message: "No hotels found for this user." });
        }
        res.status(201).json({ hotels });
    }
    catch (error) {
        console.log("Error fetching hotels:", error);
        res
            .status(500)
            .json({ message: "Something went wrong while fetching hotels." });
    }
}));
// api/my-hotels/list/:hotelId GET
router.get("/list/:hotelId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hotelId } = req.params;
        const hotel = yield hotels_1.default.findOne({ _id: hotelId, userId: req.userId });
        if (!hotel) {
            return res
                .status(404)
                .json({ message: "Hotel not found or you don't have access to it" });
        }
        res.status(201).json({ hotel });
    }
    catch (error) {
        console.log("Error fetching hotels:", error);
        res.status(500).json({
            message: "Something went wrong while fetching hotel details.",
        });
    }
}));
// api/my-hotels/list/:hotelId PUT
router.put("/list/:hotelId", auth_1.default, upload.array("imageFiles"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = yield hotels_1.default.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, updatedHotel, { new: true });
        if (!hotel) {
            return res
                .status(404)
                .json({ message: "Hotel not found or you don't have access to it" });
        }
        const files = req.files;
        const updatedImageUrls = yield uploadImages(files);
        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imageUrls || []),
        ];
        yield hotel.save();
        res.status(201).json({ hotel });
    }
    catch (error) {
        console.log("Error fetching hotels:", error);
        res.status(500).json({
            message: "Something went wrong while updating hotel details.",
        });
    }
}));
// api/my-hotels/list/:hotelId DELETE
router.delete("/list/:hotelId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield hotels_1.default.findOneAndDelete({
            _id: req.params.hotelId,
            userId: req.userId,
        });
        if (!hotel) {
            return res
                .status(404)
                .json({ message: "Hotel not found or you don't have access to it" });
        }
        return res.sendStatus(200);
    }
    catch (error) {
        console.log("Error fetching hotels:", error);
        res.status(500).json({
            message: "Something went wrong while updating hotel details.",
        });
    }
}));
function uploadImages(imageFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadPromises = imageFiles.map((image) => __awaiter(this, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = yield cloudinary_1.default.v2.uploader.upload(dataURI);
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        return imageUrls;
    });
}
exports.default = router;
