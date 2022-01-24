import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	StyleSheet,
} from "react-native";
import GlobalStyles from "../constants/GlobalStyles";

export default function NewTweetScreen({ navigation }) {
	const [tweetText, setTweetText] = useState("");

	function sendTweet() {
		navigation.navigate("Bottom Tab");
	}

	return (
		<View style={[GlobalStyles.container, styles.newTweetContainer]}>
			<View
				style={[
					GlobalStyles.flexRow,
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
				<TouchableOpacity
					style={styles.tweetButton}
					onPress={() => sendTweet()}
				>
					<Text style={styles.tweetButtonText}>Tweet</Text>
				</TouchableOpacity>
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
	);
}

const styles = StyleSheet.create({
	newTweetContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
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
		alignItems: "center",
	},
	tweetBoxContainer: {
		paddingTop: 10,
	},
});
