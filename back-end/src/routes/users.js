"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const users = await db_1.prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).send("Error search users");
    }
});
router.get("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await db_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send("Error search for this user");
    }
});
router.get("/userName/:userName", async (req, res) => {
    try {
        const userName = String(req.params.userName);
        const user = await db_1.prisma.user.findUnique({
            where: {
                userName: userName,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send("Error search for this user");
    }
});
router.post("/", async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        const verifyExisting = await db_1.prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { userName: userName }],
            },
        });
        if (verifyExisting) {
            return res
                .status(400)
                .json({ message: "User with this email or username already exists" });
        }
        const newUser = await db_1.prisma.user.create({
            data: {
                name,
                userName,
                email,
                password: await bcryptjs_1.default.hash(password, 10),
            },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).send({ message: "Error creating user" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db_1.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const verifyPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(401).json({ message: "invalid credentials" });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, userName: user.userName }, JWT_SECRET, {
            expiresIn: "2h",
        });
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).send("Error search for this user");
    }
});
router.put("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { name, userName, email, password } = req.body;
        const updateUser = await db_1.prisma.user.update({
            where: { id: userId },
            data: { name, userName, email, password },
        });
        res
            .status(200)
            .json({ message: "User updated successfully", user: updateUser });
    }
    catch (error) {
        res.status(500).send("Error updating user");
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        await db_1.prisma.user.delete({
            where: { id: userId },
        });
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error deleting user");
    }
});
exports.default = router;
