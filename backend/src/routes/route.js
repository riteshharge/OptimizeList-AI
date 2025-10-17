import express from "express";
import { AmazonProductList } from "../controller/AmazonProductList.js";
import { AllHistoryProductList } from "../controller/HistoryProductList.js";

const amazonRoutes = express.Router();

amazonRoutes.post("/amazon-product", AmazonProductList);
amazonRoutes.get("/all-history-product-list", AllHistoryProductList);

export default amazonRoutes;
