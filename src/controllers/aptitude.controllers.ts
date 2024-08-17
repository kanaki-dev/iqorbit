import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../lib/utils.js";
import { Aptitudes } from "../models/aptitude.models.js";
import { IAptitude } from "../lib/types.js";

type GlobalCache = {
  [key: string]: any;
};

/**
 * Fix it later
 * Bad way to use Cache but only used for the topics
 */
const globalCache: GlobalCache = {}; // global Cache

// get all aptitude
export async function getAllAptitude(req: Request, res: Response) {
  let allAptitude: IAptitude[] = [];
  let isQuery: boolean = true;

  const limit = parseInt(req.query.limit as string, 10) || 10;
  const page = parseInt(req.query.page as string, 10) || 1;
  const label = req.query.label;

  if (limit <= 0 || page <= 0) {
    if (limit <= 0 && page > 0) {
      return res.send(new ApiError(400, "limit can not be negative"));
    } else if (limit > 0 && page <= 0) {
      return res.send(new ApiError(400, "page can not be negative"));
    } else {
      return res.send(new ApiError(400, "limit && page can not be negative"));
    }
  }

  const skip = (page - 1) * limit;

  if (isQuery) {
    allAptitude = await Aptitudes.aggregate([
      ...(label ? [{ $match: { label } }] : []),
      { $skip: skip },
      { $limit: limit },
    ]);
  } else {
    allAptitude = await Aptitudes.find({});
  }

  
  const result = [...allAptitude].map((doc, idx) => ({
    ...doc,
    _id: idx + 1
  }))

  return res
    .status(200)
    .send(
      new ApiResponse(
        200,
        { length: result?.length, aptitudes: result },
        "All user been send"
      )
    );
}

// get topic wise aptitude
export async function gettopicAptitude(req: Request, res: Response) {
  let topicWiseAptitude = [];
  const { topic } = req.params;

  if (!globalCache["topics"]) {
    topicWiseAptitude = await Aptitudes.find({
      label: topic,
    });
    globalCache["topics"] = topicWiseAptitude;
  } else {
    topicWiseAptitude = globalCache["topics"];
  }

  return res.status(200).send(
    new ApiResponse(
      200,
      {
        length: topicWiseAptitude?.length,
        [topic]: topicWiseAptitude,
      },
      "All topic categories are send successfully"
    )
  );
}

// get aptitude topics
export async function getAptitudeTopics(req: Request, res: Response) {
  let topics: string[] = [];
  if (!globalCache["topics"]) {
    topics = await Aptitudes.find().select("label").distinct("label");
    globalCache["topics"] = topics;
  } else {
    topics = globalCache["topics"];
  }

  return res.send(
    new ApiResponse(
      200,
      { length: topics.length, topics },
      "Topics has been send"
    )
  );
}

export async function getRandomTopics(req: Request, res: Response) {
  let allAptitude: IAptitude[] = [];

  const limit: number = parseInt(req.query.limit as string, 10) || 10;
  const page: number = parseInt(req.query.page as string, 10) || 1;

  const skip: number = (page - 1) * limit;

  allAptitude = await Aptitudes.aggregate([
    { $addFields: { randomField: { $rand: {} } } },
    { $sort: { randomField: 1 } },
    { $skip: skip },
    { $limit: limit },
    { $project: { randomField: 0 } },
  ]);

  const result = [...allAptitude].map((doc, idx) => ({
    ...doc,
    _id: idx + 1
  }))

  return res
    .status(200)
    .send(
      new ApiResponse(
        200,
        { length: result?.length, aptitudes: result },
        "All user been send"
      )
    );
}
