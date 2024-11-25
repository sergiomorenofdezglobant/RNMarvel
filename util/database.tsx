import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      characterId INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      image TEXT NOT NULL
    );
  `)
}

