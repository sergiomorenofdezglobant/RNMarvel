import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
    Home: undefined;
    detailScreen: { characterId: number };
};


export type HomeScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Home"
>;


export type PlaceScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "detailScreen"
>;