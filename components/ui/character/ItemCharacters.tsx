import { Character } from "@/util/data";
import { Text, Image, StyleSheet, Pressable } from "react-native";

type CharacterListItem = {
    character: Character;
    onPress: (character: Character) => void
};

export default function ItemCharacter({character, onPress}: CharacterListItem ) {
    const image = `${character.thumbnail.path}.${character.thumbnail.extension}`
    return (
        <Pressable style={styles.container} onPress={ () => {onPress(character)}} >
            <Image source={{ uri: image}} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 10,
      margin: 4,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'darkslategrey',
      alignSelf: 'center',
      marginVertical: 10,
    },
    image: {
      width: '100%',
      aspectRatio: 1
    },
  });