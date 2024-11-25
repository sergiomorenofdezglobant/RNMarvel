import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { FavoriteDatabase, getFavorites } from '@/util/useFavoriteDataBase'
import ItemFavorite from '@/components/ui/character/ItemFavorite';
import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';
import type { RootStackParamList} from '../../constants/types'

export default function TabTwoScreen() {

    const [favorites, setFavorites] = useState<FavoriteDatabase[]>([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const initializeDatabase = async () => {
            fetchFavorites();
        };
        if (isFocused) {
            initializeDatabase();
        }

    }, [isFocused]);

    const fetchFavorites = async () => {
        const data = await getFavorites()
        setFavorites(data);
    };

    const onPressItem = (character: FavoriteDatabase) => {
      navigation.navigate("detailScreen",{characterId: character.characterId})
    }

    if (!favorites) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <ActivityIndicator size="large" />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    } else {
        return (
            <FlatList
                data={favorites}
                renderItem={({ item }) => <ItemFavorite character={item} onPress={onPressItem} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
