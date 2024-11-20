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
const hotels_1 = __importDefault(require("../models/hotels"));
const router = express_1.default.Router();
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(req.params.page ? req.params.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;
        const hotels = yield hotels_1.default.find().skip(skip).limit(pageSize);
        const total = yield hotels_1.default.countDocuments();
        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };
    }
    catch (error) {
        console.log("Error searching hotels:", error);
        res.status(500).json({
            message: "Something went wrong while searching hotels... Please try again later",
        });
    }
}));
exports.default = router;
