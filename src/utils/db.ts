import fs from "fs";
import path from "path";
import { UserDB } from "../interface";

const dbPath = path.resolve(process.cwd(), "src/database.json");
const tmpPath = dbPath + ".tmp";

// Ensure the DB file exists before reading
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "[]", "utf-8");
}

export const getDB = (): UserDB[] => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading DB:", err);
    return [];
  }
};

export const saveDB = (data: UserDB[]) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmpPath, dbPath);
  } catch (err) {
    console.error("Error saving DB:", err);
  }
};
