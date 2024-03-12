"use strict";
"use server";
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
exports.updateOneRecipe = exports.insertOneRecipe = exports.getOneRecipe = exports.getAllRecipes = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const constants_1 = require("./lib/constants");
const sqlite3v = sqlite3_1.default.verbose();
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const db = new sqlite3v.Database(constants_1.DB_FILENAME, sqlite3v.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err.message);
                    return;
                }
                resolve(db);
                console.log("Connected to DB", db);
            });
        });
    });
}
function closeDb(db) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            db.close((err) => {
                resolve(db);
                console.log("Closed DB", db, `${err ? "with error: " + err.message : ""}`);
            });
        });
    });
}
function getAllRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectDb();
        return new Promise((resolve, reject) => {
            try {
                db.all(`SELECT id,name,kind FROM  ${constants_1.DB_TABLE_RECIPES} ORDER BY name COLLATE NOCASE ASC `, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    resolve(rows);
                });
            }
            catch (error) {
                reject(error);
            }
            finally {
                closeDb(db);
            }
        });
    });
}
exports.getAllRecipes = getAllRecipes;
function getOneRecipe(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("db.tsx/getOneRecipe | id=", id);
        const db = yield connectDb();
        return new Promise((resolve, reject) => {
            let stmt;
            try {
                db.serialize(() => {
                    stmt = db.prepare(`SELECT * FROM ${constants_1.DB_TABLE_RECIPES} WHERE id=?`);
                    stmt.get(id, (err, row) => {
                        if (err) {
                            throw err;
                        }
                        if (row) {
                            resolve(row);
                            return;
                        }
                        throw new Error("Not found");
                    });
                });
            }
            catch (error) {
                reject(error);
            }
            finally {
                stmt === null || stmt === void 0 ? void 0 : stmt.finalize();
                closeDb(db);
            }
        });
    });
}
exports.getOneRecipe = getOneRecipe;
function insertOneRecipe(recipeInput) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("db.tsx/insertOneRecipe | recipeInput=", recipeInput);
        const db = yield connectDb();
        return new Promise((resolve, reject) => {
            let stmt;
            try {
                db.serialize(() => {
                    stmt = db.prepare(`INSERT INTO ${constants_1.DB_TABLE_RECIPES} (name, ingredients, steps, peopleNumber, imageDataUrl, kind) VALUES(?,?,?,?,?, ?)`);
                    stmt.run([
                        recipeInput.name,
                        recipeInput.ingredients,
                        recipeInput.steps,
                        recipeInput.peopleNumber,
                        recipeInput.imageDataUrl,
                        recipeInput.kind,
                    ], (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
            finally {
                stmt === null || stmt === void 0 ? void 0 : stmt.finalize();
                closeDb(db);
            }
        });
    });
}
exports.insertOneRecipe = insertOneRecipe;
function updateOneRecipe(recipeInput) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("db.tsx/updateOneRecipe | recipeInput=", recipeInput);
        const db = yield connectDb();
        return new Promise((resolve, reject) => {
            let stmt;
            try {
                db.serialize(() => {
                    stmt = db.prepare(`UPDATE ${constants_1.DB_TABLE_RECIPES} SET  name = ?, ingredients = ?, steps = ?, peopleNumber = ?, imageDataUrl = ? WHERE id=?`);
                    stmt.run([
                        recipeInput.name,
                        recipeInput.ingredients,
                        recipeInput.steps,
                        recipeInput.peopleNumber,
                        recipeInput.imageDataUrl,
                        recipeInput.id,
                    ], (err) => {
                        if (err) {
                            throw err;
                            return;
                        }
                    });
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
            finally {
                stmt === null || stmt === void 0 ? void 0 : stmt.finalize();
                closeDb(db);
            }
        });
    });
}
exports.updateOneRecipe = updateOneRecipe;
