import { Comic } from "@/util/data";
import { Text, Image, StyleSheet, Pressable } from "react-native";

type ComicListItem = {
    comic: Comic;
};

export default function ItemComic({comic}: ComicListItem ) {
    const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    return (
        <Pressable style={styles.container} >
            <Image source={{ uri: image}} style={styles.image} />
            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.name}>{comic.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: 100,
      borderRadius: 10,
      margin: 4,
    },
    name: {
      fontSize: 13,
      margin: 4,
    },
    image: {
      width: '100%',
      aspectRatio: 1
    },
  });