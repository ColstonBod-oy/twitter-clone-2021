import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	Platform,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import { EvilIcons } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import formatDistance from "../utils/customFormatDistance";
import axiosConfig from "../utils/axiosConfig";

export default function TweetsList({
	style,
	ListHeaderComponent,
	newTweet,
	navigation,
}) {
	const [tweets, setTweets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [page, setPage] = useState(1);
	const [isEndOfScrolling, setIsEndOfScrolling] = useState(false);
	const flatListRef = useRef();

	useEffect(() => {
		getAllTweets();
	}, [page]);

	useEffect(() => {
		if (newTweet) {
			getNewTweet();
			flatListRef.current.scrollToOffset({ offset: 0 });
		}
	}, [newTweet]);

	function getAllTweets() {
		axiosConfig
			.get(`/tweets?page=${page}`)
			.then((response) => {
				page === 1
					? setTweets(response.data.data)
					: setTweets([...tweets, ...response.data.data]);

				if (!response.data.next_page_url) {
					setIsEndOfScrolling(true);
				}

				setIsLoading(false);
				setIsRefreshing(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				setIsRefreshing(false);
			});
	}

	function getNewTweet() {
		setPage(1);
		setIsEndOfScrolling(false);
		setIsRefreshing(true);

		axiosConfig
			.get("/tweets")
			.then((response) => {
				setTweets(response.data.data);
				setIsRefreshing(false);
			})
			.catch((error) => {
				console.log(error);
				setIsRefreshing(false);
			});
	}

	function handleRefresh() {
		setPage(1);
		setIsEndOfScrolling(false);
		setIsRefreshing(true);
		getAllTweets();
	}

	function handleEnd() {
		setPage(page + 1);
	}

	function gotoProfile() {
		navigation.navigate("Profile Screen");
	}

	function gotoSingleTweet(tweetId) {
		navigation.navigate("Tweet Screen", { tweetId });
	}

	const renderItem = ({ item: tweet }) => (
		<View style={[GlobalStyles.flexRow, styles.tweetContainer]}>
			<TouchableOpacity onPress={() => gotoProfile()}>
				<Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
			</TouchableOpacity>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={GlobalStyles.flexRow}
					onPress={() => gotoSingleTweet(tweet.id)}
				>
					<Text style={styles.tweetName} numberOfLines={1}>
						{tweet.user.name}
					</Text>
					<Text
						style={[GlobalStyles.textGray, styles.tweetHandle]}
						numberOfLines={1}
					>
						@{tweet.user.username}
					</Text>
					<Text>&middot;</Text>
					<Text
						style={[GlobalStyles.textGray, styles.tweetHandle]}
						numberOfLines={1}
					>
						{formatDistanceToNowStrict(new Date(tweet.created_at), {
							addSuffix: false,
							locale: {
								...locale,
								formatDistance,
							},
						})}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tweetContentContainer}
					onPress={() => gotoSingleTweet(tweet.id)}
				>
					<Text style={styles.tweetContent}>{tweet.body}</Text>
				</TouchableOpacity>
				<View
					style={[
						GlobalStyles.flexRow,
						GlobalStyles.alignCenter,
						styles.tweetEngagement,
					]}
				>
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
		<>
			{isLoading ? (
				<ActivityIndicator size="large" color="#007aff" />
			) : (
				<FlatList
					ref={flatListRef}
					style={style}
					data={tweets}
					renderItem={renderItem}
					keyExtractor={(item, index) => String(index)}
					ListHeaderComponent={ListHeaderComponent}
					ItemSeparatorComponent={() => (
						<View style={GlobalStyles.tweetSeparator} />
					)}
					refreshing={isRefreshing}
					onRefresh={handleRefresh}
					onEndReached={handleEnd}
					onEndReachedThreshold={0}
					ListFooterComponent={() =>
						!isEndOfScrolling && (
							<ActivityIndicator size="large" color="#007aff" />
						)
					}
				/>
			)}
		</>
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
		marginTop: 12,
	},
});
