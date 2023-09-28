import {
	View,
	Text,
	Button,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthProvider";
import axiosConfig from "../../utils/axiosConfig";
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";

export default function LogInScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser, isLoading, setIsLoading, error, setError } =
		useContext(AuthContext);

	return (
		<View style={styles.logInContainer}>
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
			<Button
				title="Log In"
				onPress={() => {
					setIsLoading(true);
					setError(null);

					axiosConfig
						.post("/login", {
							email,
							password,
							device_name: Device.deviceName,
						})
						.then((response) => {
							const userResponse = {
								token: response.data.token,
								id: response.data.user.id,
								name: response.data.user.name,
								username: response.data.user.username,
								email: response.data.user.email,
								avatar: response.data.user.avatar,
							};

							setUser(userResponse);
							SecureStore.setItemAsync("user", JSON.stringify(userResponse));
						})
						.catch((error) => {
							setError(error.response.data.message);
						})
						.finally(() => {
							setIsLoading(false);
						});
				}}
			/>
			<Button
				title="Sign Up"
				onPress={() => navigation.navigate("Sign Up Screen")}
			/>
			{error && <Text style={{ color: "red" }}>{error}</Text>}
			{isLoading && (
				<ActivityIndicator style={{ marginTop: 8 }} size="small" color="gray" />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	logInContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
