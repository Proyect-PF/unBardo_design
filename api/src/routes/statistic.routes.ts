import { Router } from "express";
const statisticRoutes = Router();
import {getProductSalesStats} from "../controllers/statistic.controller";

statisticRoutes.get("/product-sales", getProductSalesStats);

export default statisticRoutes;