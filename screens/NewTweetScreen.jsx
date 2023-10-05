import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	Image,
	TextInput,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import axiosConfig from "../utils/axiosConfig";

export default function NewTweetScreen({ navigation }) {
	const [tweetText, setTweetText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	function sendTweet() {
		if (tweetText.length === 0) {
			Alert.alert("Please enter a tweet");
			return;
		}

		setIsLoading(true);

		axiosConfig
			.post("/tweets", {
				body: tweetText,
			})
			.then((response) => {
				navigation.navigate("Home2", {
					newTweet: response.data.created_at,
				});
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setIsLoading(false);
			});
	}

	return (
		<>
			{error ? (
				<Text style={GlobalStyles.textRed}>{error}</Text>
			) : (
				<View style={[GlobalStyles.container, styles.newTweetContainer]}>
					<View
						style={[
							GlobalStyles.flexRow,
							GlobalStyles.alignCenter,
							GlobalStyles.spaceBetween,
							styles.tweetButtonContainer,
						]}
					>
						<Text
							style={
								tweetText.length > 250
									? GlobalStyles.textRed
									: GlobalStyles.textGray
							}
						>
							Characters left: {280 - tweetText.length}
						</Text>
						<View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
							{isLoading && (
								<ActivityIndicator
									size="small"
									color="gray"
									style={styles.activityIndicator}
								/>
							)}
							<TouchableOpacity
								style={styles.tweetButton}
								onPress={() => sendTweet()}
								disabled={isLoading}
							>
								<Text style={styles.tweetButtonText}>Tweet</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={[GlobalStyles.flexRow, styles.tweetBoxContainer]}>
						<Image
							style={styles.avatar}
							source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
						/>
						<TextInput
							style={styles.tweetTextInput}
							onChangeText={setTweetText}
							value={tweetText}
							placeholder="What's happening?"
							placeholderTextColor="gray"
							maxLength={280}
							multiline
						/>
					</View>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	newTweetContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
	activityIndicator: {
		marginRight: 8,
	},
	avatar: {
		width: 42,
		height: 42,
		marginRight: 8,
		marginTop: 10,
		borderRadius: 21,
	},
	tweetTextInput: {
		flex: 1,
		fontSize: 18,
		lineHeight: 28,
		padding: 10,
	},
	tweetButton: {
		backgroundColor: "#1d9bf1",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 24,
	},
	tweetButtonText: {
		color: "white",
		fontWeight: "bold",
	},
	tweetButtonContainer: {
		paddingHorizontal: 6,
		paddingVertical: 4,
	},
	tweetBoxContainer: {
		paddingTop: 10,
	},
});
