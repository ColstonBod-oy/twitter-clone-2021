import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import TweetsList from "../components/TweetsList";

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

	function gotoNewTweet() {
		navigation.navigate("New Tweet Screen");
	}

	return (
		<View style={GlobalStyles.container}>
			<TweetsList data={DATA} navigation={navigation} />
			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => gotoNewTweet()}
			>
				<AntDesign name="plus" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	floatingButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1d9bf1",
		position: "absolute",
		bottom: 20,
		right: 12,
	},
});
