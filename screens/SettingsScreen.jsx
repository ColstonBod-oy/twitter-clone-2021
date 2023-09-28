import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthProvider";
import axiosConfig from "../utils/axiosConfig";
import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
	const { user, setUser, setIsLoading, setError } = useContext(AuthContext);

	return (
		<View style={styles.settingsContainer}>
			<Text>Settings Screen</Text>
			<Button
				title="Log Out"
				onPress={() => {
					setIsLoading(true);
					setError(null);

					axiosConfig.defaults.headers.common[
						"Authorization"
					] = `Bearer ${user.token}`;

					axiosConfig
						.post("/logout")
						.then((response) => {
							Promise.resolve();
						})
						.catch((error) => {
							setError(error.response.data.message);
						})
						.finally(() => {
							setUser(null);
							SecureStore.deleteItemAsync("user");
							setIsLoading(false);
						});
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	settingsContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
