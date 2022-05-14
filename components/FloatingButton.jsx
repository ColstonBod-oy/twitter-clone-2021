import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function FloatingButton({ navigation }) {
	function gotoNewTweet() {
		navigation.navigate("New Tweet Screen");
	}

	return (
		<TouchableOpacity
			style={styles.floatingButton}
			onPress={() => gotoNewTweet()}
		>
			<AntDesign name="plus" size={24} color="black" />
		</TouchableOpacity>
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
