import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../helpers/AuthProvider";
import axiosConfig from "../../utils/axiosConfig";
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";

export default function LogInScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser, isLoading, setIsLoading, error, setError } =
		useContext(AuthContext);
	const [buttonColor, setButtonColor] = useState("black");

	return (
		<View style={styles.logInContainer}>
			<View style={styles.logInForm}>
				<View style={styles.logoContainer}>
					<Image source={require("../../assets/favicon.png")} />
				</View>
				<View style={styles.logInTextInputContainer}>
					{error && <Text style={{ color: "red" }}>{error}</Text>}
					<TextInput
						style={styles.logInTextInput}
						onChangeText={setEmail}
						value={email}
						placeholder="Email"
						placeholderTextColor="gray"
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<TextInput
						style={styles.logInTextInput}
						onChangeText={setPassword}
						value={password}
						placeholder="Password"
						placeholderTextColor="gray"
						autoCapitalize="none"
						secureTextEntry={true}
					/>
				</View>
				<TouchableOpacity
					style={[{ backgroundColor: buttonColor }, styles.logInButton]}
					disabled={isLoading}
					onPress={() => {
						setIsLoading(true);
						setError(null);
						setButtonColor("gray");

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
								const errorKey = Object.keys(error.response.data.errors)[0];
								setError(error.response.data.errors[errorKey][0]);
							})
							.finally(() => {
								setIsLoading(false);
								setButtonColor("black");
							});
					}}
				>
					<Text style={styles.logInButtonText}>Log In</Text>
					{isLoading && (
						<ActivityIndicator
							style={styles.activityIndicator}
							size="small"
							color="white"
						/>
					)}
				</TouchableOpacity>
				<View style={styles.signUpContainer}>
					<Text style={styles.signUpText}>Don't have an account?</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Sign Up Screen")}
					>
						<Text style={styles.signUpLinkText}> Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	logInContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "white",
	},
	logInForm: {
		marginTop: 160,
		width: 260,
	},
	logInTextInputContainer: {
		marginTop: 40,
	},
	logInTextInput: {
		padding: 10,
		marginTop: 16,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "black",
		backgroundColor: "white",
	},
	logInButton: {
		padding: 12,
		marginTop: 22,
		borderRadius: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	logInButtonText: {
		color: "white",
	},
	signUpContainer: {
		marginTop: 12,
		flexDirection: "row",
		justifyContent: "center",
	},
	signUpText: {
		fontSize: 15,
	},
	signUpLinkText: {
		fontSize: 15,
		textDecorationLine: "underline",
	},
	logoContainer: {
		alignItems: "center",
	},
	activityIndicator: {
		marginLeft: 8,
	},
});
