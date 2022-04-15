import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import format from "date-fns/format";
import axiosConfig from "../utils/axiosConfig";

export default function TweetScreen({ route, navigation }) {
	const [tweet, setTweet] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getTweet();
	}, []);

	function getTweet() {
		axiosConfig
			.get(`/tweets/${route.params.tweetId}`)
			.then((response) => {
				setTweet(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}

	function gotoProfile() {
		navigation.navigate("Profile Screen");
	}

	return (
		<View style={GlobalStyles.container}>
			{isLoading ? (
				<ActivityIndicator size="large" color="#007aff" />
			) : (
				<>
					<View
						style={[
							GlobalStyles.flexRow,
							GlobalStyles.spaceBetween,
							styles.tweetContainer,
						]}
					>
						<TouchableOpacity
							style={GlobalStyles.flexRow}
							onPress={() => gotoProfile()}
						>
							<Image
								style={styles.avatar}
								source={{ uri: tweet.user.avatar }}
							/>
							<View>
								<Text style={styles.tweetName}>{tweet.user.name}</Text>
								<Text style={[GlobalStyles.textGray, styles.tweetHandle]}>
									@{tweet.user.username}
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<Entypo name="dots-three-vertical" size={24} color="gray" />
						</TouchableOpacity>
					</View>
					<View style={styles.tweetContentContainer}>
						<Text style={styles.tweetContent}>{tweet.body}</Text>
						<View
							style={[GlobalStyles.flexRow, styles.tweetTimestampContainer]}
						>
							<Text style={[GlobalStyles.textGray, styles.tweetTimestampText]}>
								{format(new Date(tweet.created_at), "h:mm a")}
							</Text>
							<Text style={[GlobalStyles.textGray, styles.tweetTimestampText]}>
								&middot;
							</Text>
							<Text style={[GlobalStyles.textGray, styles.tweetTimestampText]}>
								{format(new Date(tweet.created_at), "d MMM.yy")}
							</Text>
							<Text style={[GlobalStyles.textGray, styles.tweetTimestampText]}>
								&middot;
							</Text>
							<Text style={[GlobalStyles.textBlue, styles.tweetTimestampText]}>
								Twitter for iPhone
							</Text>
						</View>
					</View>
					<View
						style={[
							GlobalStyles.flexRow,
							GlobalStyles.alignCenter,
							styles.tweetEngagement,
						]}
					>
						<View style={GlobalStyles.flexRow}>
							<Text style={styles.tweetEngagementNumber}>628</Text>
							<Text
								style={[GlobalStyles.textGray, styles.tweetEngagementLabel]}
							>
								Retweets
							</Text>
						</View>
						<View style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
							<Text style={styles.tweetEngagementNumber}>38</Text>
							<Text
								style={[GlobalStyles.textGray, styles.tweetEngagementLabel]}
							>
								Quote Tweets
							</Text>
						</View>
						<View style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
							<Text style={styles.tweetEngagementNumber}>2,934</Text>
							<Text
								style={[GlobalStyles.textGray, styles.tweetEngagementLabel]}
							>
								Likes
							</Text>
						</View>
					</View>
					<View
						style={[
							GlobalStyles.flexRow,
							GlobalStyles.alignCenter,
							GlobalStyles.spaceAround,
							styles.tweetEngagement,
						]}
					>
						<TouchableOpacity>
							<EvilIcons name="comment" size={32} color="gray" />
						</TouchableOpacity>
						<TouchableOpacity>
							<EvilIcons name="retweet" size={32} color="gray" />
						</TouchableOpacity>
						<TouchableOpacity>
							<EvilIcons name="heart" size={32} color="gray" />
						</TouchableOpacity>
						<TouchableOpacity>
							<EvilIcons
								name={Platform.OS === "ios" ? "share-apple" : "share-google"}
								size={32}
								color="gray"
							/>
						</TouchableOpacity>
					</View>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		width: 50,
		height: 50,
		marginRight: 8,
		borderRadius: 25,
	},
	tweetContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
	tweetName: {
		fontWeight: "bold",
		color: "#222222",
	},
	tweetHandle: {
		marginTop: 4,
	},
	tweetContent: {
		fontSize: 20,
		lineHeight: 30,
	},
	tweetContentContainer: {
		paddingHorizontal: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#e5e7eb",
	},
	tweetTimestampContainer: {
		marginTop: 12,
	},
	tweetTimestampText: {
		marginRight: 6,
	},
	tweetEngagement: {
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#e5e7eb",
	},
	tweetEngagementNumber: {
		fontWeight: "bold",
	},
	tweetEngagementLabel: {
		marginLeft: 6,
	},
});
