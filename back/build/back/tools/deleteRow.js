"use strict";
// !!! use TSX to run this script (npm i -g tsx && tsx scripts/deleteRow.ts )
// Set ROW_TO_DELETE to the id of a recipe that you want to delete
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const constants_1 = require("../src/lib/constants");
const ROW_TO_DELETE = 156;
const sqlite3v = sqlite3_1.default.verbose();
// Connecting to or creating a new SQLite database file
const db = new sqlite3v.Database(constants_1.DB_FILENAME, sqlite3v.OPEN_READWRITE | sqlite3v.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
});
// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
    // Create the items table if it doesn't exist
    db.run(`DELETE FROM ${constants_1.DB_TABLE_RECIPES} WHERE id=${ROW_TO_DELETE};`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`DELETED`);
        //   Close the database connection after all insertions are done
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Closed the database connection.");
        });
        // });
    });
});
