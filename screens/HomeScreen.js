import React from "react";
import { View } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import TweetsList from "../components/TweetsList";
import FloatingButton from "../components/FloatingButton";

export default function HomeScreen({ navigation }) {
	const DATA = [
		{
			id: "1",
			title: "First Item",
		},
		{
			id: "2",
			title: "Second Item",
		},
		{
			id: "3",
			title: "Third Item",
		},
		{
			id: "4",
			title: "Fourth Item",
		},
		{
			id: "5",
			title: "Fifth Item",
		},
		{
			id: "6",
			title: "Sixth Item",
		},
		{
			id: "7",
			title: "Seventh Item",
		},
		{
			id: "8",
			title: "Eight Item",
		},
		{
			id: "9",
			title: "Ninth Item",
		},
		{
			id: "10",
			title: "Tenth Item",
		},
	];

	return (
		<View style={GlobalStyles.container}>
			<TweetsList data={DATA} navigation={navigation} />
			<FloatingButton navigation={navigation} />
		</View>
	);
}
