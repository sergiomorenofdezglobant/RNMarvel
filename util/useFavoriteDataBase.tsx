import { useSQLiteContext } from "expo-sqlite"
import * as SQLite from 'expo-sqlite';

export type FavoriteDatabase = {
    characterId: number;
    name: string;
    image: string
}

export async function getFavorites() {
    const db = await SQLite.openDatabaseAsync('characters.db');
    try {
        const query = "SELECT * FROM favorites"

        const response = await db.getAllAsync<FavoriteDatabase>(
            query
        )
        return response
    } catch (error) {
        throw error
    }
}

export async function isFavorite(characterId: number) {
    const db = await SQLite.openDatabaseAsync('characters.db');
    try {
        const query = "SELECT * FROM favorites WHERE characterId = " + characterId

        const response = await db.getAllAsync<FavoriteDatabase>(
            query
        )
        return response
    } catch (error) {
        throw error
    }
}

export async function addFavorite(favoriteDB: FavoriteDatabase) {
    const db = await SQLite.openDatabaseAsync('characters.db');
    const statement = await db.prepareAsync(
        "INSERT INTO favorites (characterId, name, image) VALUES ($characterId, $name, $image)"
    )
    try {
        
        const result = await statement.executeAsync({
            $characterId: favoriteDB.characterId,
            $name: favoriteDB.name,
            $image: favoriteDB.image
        })
        const insertedRowId = result.lastInsertRowId.toLocaleString()

        return { insertedRowId }
    } catch (error) {
        throw error
    } finally {
        await statement.finalizeAsync()
    }
}

export async function removeFavorite(characterId: number) {
    const db = await SQLite.openDatabaseAsync('characters.db');
    try {
        await db.execAsync("DELETE FROM favorites WHERE characterId = " + characterId)
    } catch (error) {
        throw error
    }
}

