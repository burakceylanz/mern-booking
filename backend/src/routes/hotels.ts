import express, { Response, Request } from "express";
import Hotels from "../models/hotels";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.params.page ? req.params.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotels.find().skip(skip).limit(pageSize);
    const total = await Hotels.countDocuments();

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(201).send(response);
  } catch (error) {
    console.log("Error searching hotels:", error);
    res.status(500).json({
      message:
        "Something went wrong while searching hotels... Please try again later",
    });
  }
});


export default router;