import { Router } from "express";
import {
  getAllAptitude,
  getAptitudeTopics,
  getRandomTopics,
  gettopicAptitude,
} from "../controllers/aptitude.controllers";
const router: Router = Router();

router.route("/all").get(getAllAptitude);
router.route("/getTopics").get(getAptitudeTopics);
router.route("/random").get(getRandomTopics);
router.route("/:topic").get(gettopicAptitude);

export default router;
