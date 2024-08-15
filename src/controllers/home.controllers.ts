
import { ApiResponse } from "../lib/utils.js";
import { Request, Response } from "express";

export async function home(req: Request, res: Response) {
	res.status(200).send(new ApiResponse(200, {
		msg: "Wellcome to the amazing Aptitude API"
	}));
}