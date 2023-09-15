import { View, Text, Button } from "react-native";
import React from "react";

export default function SignUpScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Sign Up Screen</Text>
			<Button
				title="Log In"
				onPress={() => navigation.navigate("Log In Screen")}
			/>
		</View>
	);
}
