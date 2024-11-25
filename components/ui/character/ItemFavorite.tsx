import { FavoriteDatabase } from "@/util/useFavoriteDataBase";
import { Text, Image, StyleSheet, Pressable } from "react-native";

type CharacterListItem = {
    character: FavoriteDatabase;
    onPress: (character: FavoriteDatabase) => void
};

export default function ItemFavorite({ character, onPress }: CharacterListItem) {
    const image = character.image
    return (
        <Pressable style={styles.container} onPress={() => { onPress(character) }} >
            <Image source={{ uri: image }} style={styles.image} />
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{character.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        margin: 4,
        alignItems: 'center'
    },
    name: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'darkslategrey',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginEnd: 16,
    },
});