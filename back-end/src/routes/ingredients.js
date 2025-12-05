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
        const ingredients = await db_1.prisma.ingredient.findMany();
        res.status(200).json(ingredients);
    }
    catch (error) {
        res.status(500).send("Error search ingredients");
    }
});
router.get("/:id", async (req, res) => {
    try {
        const ingredientId = parseInt(req.params.id);
        const ingredient = await db_1.prisma.ingredient.findUnique({
            where: {
                id: ingredientId,
            },
        });
        res.status(200).json(ingredient);
    }
    catch (error) {
        res.status(500).send("Error search for this ingredient");
    }
});
router.post("/", async (req, res) => {
    try {
        const { ingredients, recipeId } = req.body;
        const newIngredient = await db_1.prisma.ingredient.create({
            data: {
                ingredients,
                recipe: { connect: { id: recipeId } },
            },
        });
        res.status(201).json(newIngredient);
    }
    catch (error) {
        res.status(500).send({ message: "Error creating ingredient" });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const ingredientId = parseInt(req.params.id);
        const { ingredients, recipeId } = req.body;
        const updateIngredient = await db_1.prisma.ingredient.update({
            where: {
                id: ingredientId,
            },
            data: {
                ingredients,
                recipe: { connect: { id: recipeId } },
            },
        });
        res.status(200).json(updateIngredient);
    }
    catch (error) {
        res.status(500).send("Error updating ingredient");
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const ingredientId = parseInt(req.params.id);
        await db_1.prisma.ingredient.delete({
            where: {
                id: ingredientId,
            },
        });
        res.status(204).send("Ingredient deleted");
    }
    catch (error) {
        res.status(500).send("Error deleting ingredient");
    }
});
exports.default = router;
