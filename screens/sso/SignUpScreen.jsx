import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Alert,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { AuthContext } from "../../helpers/AuthProvider";
import axiosConfig from "../../utils/axiosConfig";

export default function SignUpScreen({ navigation }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);
	const { isLoading, setIsLoading } = useContext(AuthContext);
	const [buttonColor, setButtonColor] = useState("black");

	return (
		<View style={styles.signUpContainer}>
			<View style={{ marginTop: 160 - useHeaderHeight(), width: 260 }}>
				<View style={styles.logoContainer}>
					<Image source={require("../../assets/favicon.png")} />
				</View>
				<View style={styles.signUpTextInputContainer}>
					{error && <Text style={{ color: "red" }}>{error}</Text>}
					<TextInput
						style={styles.signUpTextInput}
						onChangeText={setName}
						value={name}
						placeholder="Name"
						placeholderTextColor="gray"
					/>
					<TextInput
						style={styles.signUpTextInput}
						onChangeText={setEmail}
						value={email}
						placeholder="Email"
						placeholderTextColor="gray"
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<TextInput
						style={styles.signUpTextInput}
						onChangeText={setUsername}
						value={username}
						placeholder="Username"
						placeholderTextColor="gray"
						autoCapitalize="none"
					/>
					<TextInput
						style={styles.signUpTextInput}
						onChangeText={setPassword}
						value={password}
						placeholder="Password"
						placeholderTextColor="gray"
						autoCapitalize="none"
						secureTextEntry={true}
					/>
					<TextInput
						style={styles.signUpTextInput}
						onChangeText={setConfirmPassword}
						value={confirmPassword}
						placeholder="Confirm Password"
						placeholderTextColor="gray"
						autoCapitalize="none"
						secureTextEntry={true}
					/>
				</View>
				<TouchableOpacity
					style={[{ backgroundColor: buttonColor }, styles.signUpButton]}
					disabled={isLoading}
					onPress={() => {
						setIsLoading(true);
						setError(null);
						setButtonColor("gray");

						axiosConfig
							.post("/signup", {
								name,
								email,
								username,
								password,
								password_confirmation: confirmPassword,
							})
							.then((response) => {
								Alert.alert("User created. Please log in.");
								navigation.navigate("Log In Screen");
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
					<Text style={styles.signUpButtonText}>Sign Up</Text>
					{isLoading && (
						<ActivityIndicator
							style={styles.activityIndicator}
							size="small"
							color="white"
						/>
					)}
				</TouchableOpacity>
				<View style={styles.logInContainer}>
					<Text style={styles.logInText}>Already have an account?</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Log In Screen")}
					>
						<Text style={styles.logInLinkText}> Log In</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	signUpContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "white",
	},
	signUpTextInputContainer: {
		marginTop: 40,
	},
	signUpTextInput: {
		padding: 10,
		marginTop: 16,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "black",
		backgroundColor: "white",
	},
	signUpButton: {
		padding: 12,
		marginTop: 22,
		borderRadius: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	signUpButtonText: {
		color: "white",
	},
	logInContainer: {
		marginTop: 12,
		flexDirection: "row",
		justifyContent: "center",
	},
	logInText: {
		fontSize: 15,
	},
	logInLinkText: {
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
