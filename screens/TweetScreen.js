import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Entypo, EvilIcons } from "@expo/vector-icons";

export default function TweetScreen() {
	return (
		<View style={styles.container}>
			<View style={[styles.flexRow, styles.profileContainer]}>
				<TouchableOpacity style={styles.flexRow}>
					<Image
						style={styles.avatar}
						source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
					/>
					<View>
						<Text style={styles.tweetName}>Andre Madarang</Text>
						<Text style={[styles.textGray, styles.tweetHandle]}>
							@drehimself
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<Entypo name="dots-three-vertical" size={24} color="gray" />
				</TouchableOpacity>
			</View>
			<View style={styles.tweetContentContainer}>
				<Text style={styles.tweetContent}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
					voluptas facere, accusamus autem adipisci quia officia mollitia
					excepturi debitis maxime dolorum alias officiis ea velit animi
					suscipit eligendi aspernatur laboriosam optio commodi aliquid tempore
					ratione! Adipisci rem tempore temporibus laborum.
				</Text>
			</View>
			<View style={[styles.flexRow, styles.tweetEngagement]}>
				<View style={styles.flexRow}>
					<Text style={styles.tweetEngagementNumber}>628</Text>
					<Text style={[styles.textGray, styles.tweetEngagementLabel]}>
						Retweets
					</Text>
				</View>
				<View style={[styles.ml4, styles.flexRow]}>
					<Text style={styles.tweetEngagementNumber}>38</Text>
					<Text style={[styles.textGray, styles.tweetEngagementLabel]}>
						Quote Tweets
					</Text>
				</View>
				<View style={[styles.ml4, styles.flexRow]}>
					<Text style={styles.tweetEngagementNumber}>2,934</Text>
					<Text style={[styles.textGray, styles.tweetEngagementLabel]}>
						Likes
					</Text>
				</View>
			</View>
			<View
				style={[styles.flexRow, styles.spaceAround, styles.tweetEngagement]}
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
		</View>
	);
}

const styles = StyleSheet.create({
	ml4: {
		marginLeft: 16,
	},
	flexRow: {
		flexDirection: "row",
	},
	spaceAround: {
		justifyContent: "space-around",
	},
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	textGray: {
		color: "gray",
	},
	avatar: {
		width: 50,
		height: 50,
		marginRight: 8,
		borderRadius: 25,
	},
	profileContainer: {
		justifyContent: "space-between",
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
	tweetEngagement: {
		alignItems: "center",
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