"use server";
import sqlite3 from "sqlite3";
import { RecipeInput, RecipeRow, RecipeRowShort } from "../../front/src/types";
import { DB_FILENAME, DB_TABLE_RECIPES } from "./lib/constants";

const sqlite3v = sqlite3.verbose();

async function connectDb(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3v.Database(
      DB_FILENAME,
      sqlite3v.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err.message);
          return;
        }

        resolve(db);
        console.log("Connected to DB", db);
      }
    );
  });
}

async function closeDb(db: sqlite3.Database): Promise<sqlite3.Database> {
  return new Promise((resolve) => {
    db.close((err) => {
      resolve(db);
      console.log(
        "Closed DB",
        db,
        `${err ? "with error: " + err.message : ""}`
      );
    });
  });
}

export async function getAllRecipes(): Promise<RecipeRowShort[]> {
  const db = await connectDb();

  return new Promise((resolve, reject) => {
    try {
      db.all<RecipeRowShort>(
        `SELECT id,name,kind FROM  ${DB_TABLE_RECIPES} ORDER BY name COLLATE NOCASE ASC `,
        (err, rows) => {
          if (err) {
            throw err;
          }
          resolve(rows);
        }
      );
    } catch (error) {
      reject(error);
    } finally {
      closeDb(db);
    }
  });
}

export async function getOneRecipe(id: number): Promise<RecipeRow> {
  console.log("db.tsx/getOneRecipe | id=", id);
  const db = await connectDb();
  return new Promise((resolve, reject) => {
    let stmt: sqlite3.Statement | undefined;
    try {
      db.serialize(() => {
        stmt = db.prepare(`SELECT * FROM ${DB_TABLE_RECIPES} WHERE id=?`);
        stmt.get<RecipeRow>(id, (err, row) => {
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
    } catch (error) {
      reject(error);
    } finally {
      stmt?.finalize();
      closeDb(db);
    }
  });
}

export async function insertOneRecipe(recipeInput: RecipeInput): Promise<void> {
  console.log("db.tsx/insertOneRecipe | recipeInput=", recipeInput);
  const db = await connectDb();
  return new Promise((resolve, reject) => {
    let stmt: sqlite3.Statement | undefined;
    try {
      db.serialize(() => {
        stmt = db.prepare(
          `INSERT INTO ${DB_TABLE_RECIPES} (name, ingredients, steps, peopleNumber, imageDataUrl, kind) VALUES(?,?,?,?,?, ?)`
        );
        stmt.run(
          [
            recipeInput.name,
            recipeInput.ingredients,
            recipeInput.steps,
            recipeInput.peopleNumber,
            recipeInput.imageDataUrl,
            recipeInput.kind,
          ],
          (err: Error) => {
            if (err) {
              throw err;
            }
          }
        );

        resolve();
      });
    } catch (error) {
      reject(error);
    } finally {
      stmt?.finalize();
      closeDb(db);
    }
  });
}

export async function updateOneRecipe(
  recipeId: number,
  recipeInput: RecipeInput
): Promise<void> {
  console.log("db.tsx/updateOneRecipe | recipeInput=", recipeInput);
  const db = await connectDb();
  return new Promise((resolve, reject) => {
    let stmt: sqlite3.Statement | undefined;
    try {
      db.serialize(() => {
        stmt = db.prepare(
          `UPDATE ${DB_TABLE_RECIPES} SET  name = ?, ingredients = ?, steps = ?, peopleNumber = ?, imageDataUrl = ? WHERE id=?`
        );
        stmt.run(
          [
            recipeInput.name,
            recipeInput.ingredients,
            recipeInput.steps,
            recipeInput.peopleNumber,
            recipeInput.imageDataUrl,
            recipeId,
          ],
          (err: Error) => {
            if (err) {
              throw err;
              return;
            }
          }
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    } finally {
      stmt?.finalize();
      closeDb(db);
    }
  });
}