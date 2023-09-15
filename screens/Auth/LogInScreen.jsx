import { View, Text, Button } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthProvider";

export default function LogInScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(AuthContext);

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Log In Screen</Text>
			<TextInput
				onChangeText={setEmail}
				value={email}
				placeholder="Email"
				placeholderTextColor="gray"
				textContentType="emailAddress"
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				onChangeText={setPassword}
				value={password}
				placeholder="Password"
				placeholderTextColor="gray"
				autoCapitalize="none"
				secureTextEntry={true}
			/>
			<Button title="Log In" onPress={() => setUser("test-user")} />
			<Button
				title="Sign Up"
				onPress={() => navigation.navigate("Sign Up Screen")}
			/>
		</View>
	);
}
