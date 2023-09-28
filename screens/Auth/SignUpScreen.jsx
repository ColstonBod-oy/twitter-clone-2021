import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

export default function SignUpScreen({ navigation }) {
	return (
		<View style={styles.signUpContainer}>
			<Text>Sign Up Screen</Text>
			<Button
				title="Log In"
				onPress={() => navigation.navigate("Log In Screen")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	signUpContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
