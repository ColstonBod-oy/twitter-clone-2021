import React from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	Platform,
	TouchableOpacity,
} from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import { EvilIcons } from "@expo/vector-icons";

export default function TweetsList({ data, navigation }) {
	function gotoProfile() {
		navigation.navigate("Profile Screen");
	}

	function gotoSingleTweet() {
		navigation.navigate("Tweet Screen");
	}

	const renderItem = ({ item }) => (
		<View style={[GlobalStyles.flexRow, styles.tweetContainer]}>
			<TouchableOpacity onPress={() => gotoProfile()}>
				<Image
					style={styles.avatar}
					source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
				/>
			</TouchableOpacity>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={GlobalStyles.flexRow}
					onPress={() => gotoSingleTweet()}
				>
					<Text style={styles.tweetName} numberOfLines={1}>
						{item.title}
					</Text>
					<Text
						style={[GlobalStyles.textGray, styles.tweetHandle]}
						numberOfLines={1}
					>
						@drehimself
					</Text>
					<Text>&middot;</Text>
					<Text
						style={[GlobalStyles.textGray, styles.tweetHandle]}
						numberOfLines={1}
					>
						9m
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tweetContentContainer}
					onPress={() => gotoSingleTweet()}
				>
					<Text style={styles.tweetContent}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
						ipsam blanditiis, quasi et id totam natus vero facilis reiciendis
						facere.
					</Text>
				</TouchableOpacity>
				<View style={[GlobalStyles.flexRow, styles.tweetEngagement]}>
					<TouchableOpacity style={GlobalStyles.flexRow}>
						<EvilIcons
							name="comment"
							size={22}
							color="gray"
							style={{ marginRight: 2 }}
						/>
						<Text style={GlobalStyles.textGray}>456</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
						<EvilIcons
							name="retweet"
							size={22}
							color="gray"
							style={{ marginRight: 2 }}
						/>
						<Text style={GlobalStyles.textGray}>32</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
						<EvilIcons
							name="heart"
							size={22}
							color="gray"
							style={{ marginRight: 2 }}
						/>
						<Text style={GlobalStyles.textGray}>4,456</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
						<EvilIcons
							name={Platform.OS === "ios" ? "share-apple" : "share-google"}
							size={22}
							color="gray"
							style={{ marginRight: 2 }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => (
				<View style={GlobalStyles.tweetSeparator} />
			)}
		/>
	);
}

const styles = StyleSheet.create({
	avatar: {
		width: 42,
		height: 42,
		marginRight: 8,
		borderRadius: 21,
	},
	tweetContainer: {
		paddingHorizontal: 12,
		paddingVertical: 12,
	},
	tweetName: {
		fontWeight: "bold",
		color: "#222222",
	},
	tweetHandle: {
		marginHorizontal: 8,
	},
	tweetContent: {
		lineHeight: 20,
	},
	tweetContentContainer: {
		marginTop: 4,
	},
	tweetEngagement: {
		alignItems: "center",
		marginTop: 12,
	},
});
