import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../helpers/AuthProvider";
import axiosConfig from "../utils/axiosConfig";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements";

export default function SettingsScreen() {
	const { user, setUser, isLoading, setIsLoading, setError } =
		useContext(AuthContext);

	return (
		<View style={styles.settingsContainer}>
			<View style={{ marginTop: -useHeaderHeight(), width: 260 }}>
				<TouchableOpacity
					style={styles.logOutButton}
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
				>
					<Text style={styles.logOutButtonText}>Log Out</Text>
					{isLoading && (
						<ActivityIndicator
							style={styles.activityIndicator}
							size="small"
							color="white"
						/>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	settingsContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logOutButton: {
		padding: 12,
		marginTop: 22,
		borderRadius: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "black",
	},
	logOutButtonText: {
		color: "white",
	},
	activityIndicator: {
		marginLeft: 8,
	},
});
