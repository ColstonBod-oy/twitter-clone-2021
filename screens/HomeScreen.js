import React from "react";
import { View } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import TweetsList from "../components/TweetsList";
import FloatingButton from "../components/FloatingButton";

export default function HomeScreen({ navigation }) {
	return (
		<View style={GlobalStyles.container}>
			<TweetsList navigation={navigation} />
			<FloatingButton navigation={navigation} />
		</View>
	);
}
