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
        const preparationMethods = await db_1.prisma.preparationMethod.findMany();
        res.status(200).json(preparationMethods);
    }
    catch (error) {
        res.status(500).send("Error fetching preparation methods");
    }
});
router.get("/:id", async (req, res) => {
    try {
        const methodId = parseInt(req.params.id);
        const method = await db_1.prisma.preparationMethod.findUnique({
            where: {
                id: methodId,
            },
        });
        res.status(200).json(method);
    }
    catch (error) {
        res.status(500).send("Error fetching this preparation method");
    }
});
router.get("/recipe/:recipeId", async (req, res) => {
    try {
        const recipeId = parseInt(req.params.recipeId);
        const methods = await db_1.prisma.preparationMethod.findMany({
            where: {
                recipeId: recipeId,
            },
        });
        res.status(200).json(methods);
    }
    catch (error) {
        res.status(500).send("Error fetching preparation methods for this user");
    }
});
router.post("/", async (req, res) => {
    try {
        const { steps, recipeId } = req.body;
        const newMethod = await db_1.prisma.preparationMethod.create({
            data: {
                steps,
                recipe: { connect: { id: recipeId } },
            },
        });
        res.status(201).json(newMethod);
    }
    catch (error) {
        res.status(500).send("Error creating preparation method");
    }
});
router.put("/:id", async (req, res) => {
    try {
        const methodId = parseInt(req.params.id);
        const { steps, recipeId } = req.body;
        const updatedMethod = await db_1.prisma.preparationMethod.update({
            where: {
                id: methodId,
            },
            data: {
                steps,
                recipe: { connect: { id: recipeId } },
            },
        });
        res.status(200).json(updatedMethod);
    }
    catch (error) {
        res.status(500).send("Error updating preparation method");
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const methodId = parseInt(req.params.id);
        await db_1.prisma.preparationMethod.delete({
            where: {
                id: methodId,
            },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send({
            error: "Error deleting preparation method",
            details: {
                message: error.message,
            },
        });
    }
});
exports.default = router;
