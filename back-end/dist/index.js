"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./src/routes/users"));
const ingredients_1 = __importDefault(require("./src/routes/ingredients"));
const preparationMethod_1 = __importDefault(require("./src/routes/preparationMethod"));
const recipe_1 = __importDefault(require("./src/routes/recipe"));
const review_1 = __importDefault(require("./src/routes/review"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
const port = 3000;
app.use(express_1.default.json());
app.use("/users", users_1.default);
app.use("/ingredients", ingredients_1.default);
app.use("/preparationMethods", preparationMethod_1.default);
app.use("/recipes", recipe_1.default);
app.use("/reviews", review_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
