import { Image, FlatList, Text, StyleSheet, View, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Character, Comic } from "@/util/data";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getCharacter, getComics } from "@/util/http";
import ItemComic from "@/components/ui/comic/ItemComic"
import type { RootStackParamList } from '../constants/types'
import { addFavorite, FavoriteDatabase, isFavorite, removeFavorite } from "@/util/useFavoriteDataBase";
import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'detailScreen'>>();
    const characterId = route.params.characterId

    const [isFav, setIsFav] = useState(false)
    const [character, setCharacter] = useState<Character>()
    const [comics, setComics] = useState<Comic[]>()

    useEffect(() => {
        async function isFavoriteDB() {
            const isFav = await isFavorite(characterId)
            setIsFav(isFav.length > 0)
        }

        isFavoriteDB()
    }, []);

    const onPressFav = () => {
        if(character){
            if(isFav){
                removeFavorite(characterId)
            }else {
                addFavoriteDB(character)
            }
            setIsFav(!isFav)
        }
    }

    async function addFavoriteDB(character: Character) {
        const favoriteDB: FavoriteDatabase = {
            characterId: character.id,
            name: character.name,
            image: `${character.thumbnail.path}.${character.thumbnail.extension}`
        }

        const x = await addFavorite(favoriteDB)
    }



    useEffect(() => {
        async function fetchCharacter() {
            try {
                const character: Character = await getCharacter(characterId)
                setCharacter(character)
                console.log("Descarga de character completado")
            } catch (error) {
                console.log("Error al recoger")
            }
        }

        fetchCharacter();
    }, []);

    useEffect(() => {
        async function fetchComics() {
            try {
                const comics: Comic[] = await getComics(characterId)
                setComics(comics)
                console.log("Descarga de comics completado")
            } catch (error) {
                console.log("Error al recoger")
            }
        }

        fetchComics();
    }, []);

    const nameIcon = isFav ? "heart" : "heart-outline"
    
    let comicsView
    if (!comics) {
        comicsView = <SafeAreaProvider>
            <SafeAreaView style={styles.containerComics}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        </SafeAreaProvider>
    } else {
        comicsView = <FlatList
            horizontal={true}
            data={comics}
            renderItem={({ item }) => <ItemComic comic={item} />}
        >

        </FlatList>
    }

    if (!character) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <ActivityIndicator size="large" />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    } else {
        const image = `${character.thumbnail.path}.${character.thumbnail.extension}`
        return (
            <ScrollView>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{character.name}</Text>
                        <Ionicons name={nameIcon} size={32} onPress={onPressFav}/>
                    </View>
                    <Text style={styles.title}>Descripción</Text>
                    <Text style={styles.description}>{character.description}</Text>
                    <Text style={styles.title}>Comics</Text>
                    {comicsView}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginEnd: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
    },
    containerComics: {
        width: '100%',
        height: 300
    }
});