"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./src/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.get("/", (_req, res) => {
    res.status(200).json({ message: "OK" });
});
app.get("/miam/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield (0, db_1.getAllRecipes)();
    res.json({
        count: recipes.length,
        recipes,
    });
}));
app.get("/miam/recipes/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield (0, db_1.getOneRecipe)(parseInt(req.params.recipeId, 10));
    res.json({
        recipe,
    });
}));
app.post("/miam/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.insertOneRecipe)(req.body);
    res.status(201).json({ message: "Recipe successfully added" });
}));
app.put("/miam/recipes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.updateOneRecipe)(req.body);
    res.json({ message: "Recipe successfully updated" });
}));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
