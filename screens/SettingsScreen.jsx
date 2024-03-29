import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../helpers/AuthProvider";
import axiosConfig from "../utils/axiosConfig";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements";
import { CommonActions } from "@react-navigation/native";

export default function SettingsScreen({ navigation }) {
	const { user, setUser, isLoading, setIsLoading, setError } =
		useContext(AuthContext);
	const [buttonColor, setButtonColor] = useState("black");

	return (
		<View style={styles.settingsContainer}>
			<View style={{ marginTop: -useHeaderHeight(), width: 260 }}>
				<TouchableOpacity
					style={[{ backgroundColor: buttonColor }, styles.logOutButton]}
					disabled={isLoading}
					onPress={() => {
						setIsLoading(true);
						setError(null);
						setButtonColor("gray");

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
								navigation.dispatch(
									CommonActions.reset({
										index: 0,
										routes: [{ name: "Home" }],
									})
								);

								setUser(null);
								SecureStore.deleteItemAsync("user");
								setIsLoading(false);
								setButtonColor("black");
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
	},
	logOutButtonText: {
		color: "white",
	},
	activityIndicator: {
		marginLeft: 8,
	},
});
