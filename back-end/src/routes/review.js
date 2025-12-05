"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const recipes = await db_1.prisma.recipe.findMany();
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});
router.post("/", async (req, res) => {
    try {
        const { rating, comment, userId, recipeId } = req.body;
        const newReview = await db_1.prisma.review.create({
            data: {
                rating,
                comment,
                userId,
                recipeId
            },
        });
        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create recipe" });
    }
});
exports.default = router;
