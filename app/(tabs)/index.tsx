import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCharacters } from '../../util/http'
import { Character } from '@/util/data';
import ItemCharacter from '@/components/ui/character/ItemCharacters';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';
import type { RootStackParamList} from '../../constants/types'

export default function HomeScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [characters, setCharacters] = useState<Character[]>()
    
    const onPressItem = (character: Character) => {
        navigation.navigate("detailScreen",{characterId: character.id})
    }

    useEffect(() => {
        async function fetchCharacters() {
            try {
                const cha: Character[] = await getCharacters()
                setCharacters(cha)
                console.log("Descarga de characters completado")
            } catch (error) {
                console.log("Error al recoger")
            }
        }

        fetchCharacters();
    }, []);


    if (!characters) {
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
                data={characters}
                renderItem={({item}) => <ItemCharacter character={item} onPress={onPressItem}/>}
                numColumns={2}
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
