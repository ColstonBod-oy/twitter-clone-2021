import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
	return (
		<View>
			<Text>Home Screen / Feed</Text>
			<Button
				title="New Tweet Screen"
				onPress={() => navigation.navigate("New Tweet Screen")}
			/>
			<Button
				title="Tweet Screen"
				onPress={() => navigation.navigate("Tweet Screen")}
			/>
			<Button
				title="Profile Screen"
				onPress={() => navigation.navigate("Profile Screen")}
			/>
		</View>
	);
}
