import axios from "axios";
import { Character, Comic } from "./data";

const TS = '1'
const API_KEY = "479f5c5b85a63593996614e72386202b"
const HASH = "ccfd8a1c3ae29918a7bc3e318d5bd868"

const BASE_URL = "https://gateway.marvel.com"
const MARVEL_QUERY = `ts=${TS}&apikey=${API_KEY}&hash=${HASH}`

export async function getCharacters() {
    const url = `/v1/public/characters?${MARVEL_QUERY}`

    const response = await axios.get(
        BASE_URL + url
    );

    const responseData: Character[] = response.data.data.results

    return responseData

}

export async function getCharacter(characterId:number) {
    const url = `/v1/public/characters/${characterId}?${MARVEL_QUERY}`
    const response = await axios.get(
        BASE_URL + url
    );
    

    const responseData: Character[] = response.data.data.results

    return responseData[0]
}

export async function getComics(characterId:number) {
     const url = `/v1/public/characters/${characterId}/comics?${MARVEL_QUERY}`
    const response = await axios.get(
        BASE_URL + url
    );
    

    const responseData: Comic[] = response.data.data.results

    return responseData
}