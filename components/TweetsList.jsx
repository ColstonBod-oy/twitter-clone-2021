import React, { useReducer, useEffect, useRef, useContext } from "react";
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
import GlobalStyles from "../styles/GlobalStyles";
import { EvilIcons } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import formatDistance from "../utils/customFormatDistance";
import axiosConfig from "../utils/axiosConfig";
import { AuthContext } from "../helpers/AuthProvider";

export default function TweetsList({
	url,
	profile,
	style,
	ListHeaderComponent,
	newTweet,
	navigation,
}) {
	const initialState = {
		status: url ? "loading" : "idle",
		tweets: null,
		page: 1,
		error: null,
	};

	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "IDLE":
				return { ...initialState, status: "idle" };
			case "REFRESHING":
				return { ...state, status: "refreshing", page: 1 };
			case "LOADED":
				return { ...state, status: "loaded", tweets: action.payload };
			case "SCROLLING":
				return { ...state, status: "scrolling", page: state.page + 1 };
			case "END":
				return { ...state, status: "end", page: -1 };
			case "ERROR":
				return {
					status: "error",
					tweets: null,
					page: 1,
					error: action.payload,
				};
			default:
				return state;
		}
	}, initialState);

	const flatListRef = useRef();
	const controller = new AbortController();

	useEffect(() => {
		if (!url) {
			dispatch({ type: "IDLE" });
			return;
		}

		getAllTweets();

		return function cleanup() {
			controller.abort();
		};
	}, [state.page]);

	useEffect(() => {
		if (!url) {
			dispatch({ type: "IDLE" });
			return;
		} else if (newTweet) {
			getNewTweet();
			flatListRef.current.scrollToOffset({ offset: 0 });
		}

		return function cleanup() {
			controller.abort();
		};
	}, [newTweet]);

	const { user } = useContext(AuthContext);

	function getAllTweets() {
		if (url === "/tweets") {
			axiosConfig.defaults.headers.common[
				"Authorization"
			] = `Bearer ${user.token}`;
		}

		axiosConfig
			.get(`${url}?page=${state.page}`, { signal: controller.signal })
			.then((response) => {
				if (state.page !== -1) {
					state.page === 1
						? dispatch({ type: "LOADED", payload: response.data.data })
						: dispatch({
								type: "LOADED",
								payload: [...state.tweets, ...response.data.data],
						  });
				}

				if (!response.data.next_page_url) {
					dispatch({ type: "END" });
				}
			})
			.catch((error) => {
				if (error.message !== "canceled") {
					dispatch({ type: "ERROR", payload: error });
				}
			});
	}

	function getNewTweet() {
		dispatch({ type: "REFRESHING" });

		if (url === "/tweets") {
			axiosConfig.defaults.headers.common[
				"Authorization"
			] = `Bearer ${user.token}`;
		}

		axiosConfig
			.get(url, { signal: controller.signal })
			.then((response) => {
				dispatch({ type: "LOADED", payload: response.data.data });
			})
			.catch((error) => {
				if (error.message !== "canceled") {
					dispatch({ type: "ERROR", payload: error });
				}
			});
	}

	function handleRefresh() {
		dispatch({ type: "REFRESHING" });
		getAllTweets();
	}

	function handleEnd() {
		if (state.page !== -1) {
			dispatch({ type: "SCROLLING" });
		}
	}

	function gotoProfile(userId) {
		navigation.navigate("Profile Screen", { userId });
	}

	function gotoSingleTweet(tweetId) {
		navigation.navigate("Tweet Screen", { tweetId });
	}

	const renderItem = ({ item: tweet }) => (
		<View style={[GlobalStyles.flexRow, styles.tweetContainer]}>
			<TouchableOpacity
				onPress={() =>
					gotoProfile(
						url === "/tweets" || url === "/tweets_all"
							? tweet.user.id
							: profile.id
					)
				}
			>
				<Image
					style={styles.avatar}
					source={{
						uri:
							url === "/tweets" || url === "/tweets_all"
								? tweet.user.avatar
								: profile.avatar,
					}}
				/>
			</TouchableOpacity>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={GlobalStyles.flexRow}
					onPress={() =>
						gotoProfile(
							url === "/tweets" || url === "/tweets_all"
								? tweet.user.id
								: profile.id
						)
					}
				>
					<Text style={styles.tweetName} numberOfLines={1}>
						{url === "/tweets" || url === "/tweets_all"
							? tweet.user.name
							: profile.name}
					</Text>
					<Text
						style={[GlobalStyles.textGray, styles.tweetHandle]}
						numberOfLines={1}
					>
						@
						{url === "/tweets" || url === "/tweets_all"
							? tweet.user.username
							: profile.username}
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
							style={styles.icon}
						/>
						<Text style={GlobalStyles.textGray}>456</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
						<EvilIcons
							name="retweet"
							size={22}
							color="gray"
							style={styles.icon}
						/>
						<Text style={GlobalStyles.textGray}>32</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
						<EvilIcons
							name="heart"
							size={22}
							color="gray"
							style={styles.icon}
						/>
						<Text style={GlobalStyles.textGray}>4,456</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
						<EvilIcons
							name={Platform.OS === "ios" ? "share-apple" : "share-google"}
							size={22}
							color="gray"
							style={styles.icon}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	return (
		<>
			{state.status === "error" ? (
				<Text style={GlobalStyles.textRed}>{state.error.message}</Text>
			) : state.status === "loading" ? (
				<ActivityIndicator size="large" color="black" />
			) : (
				<FlatList
					ref={flatListRef}
					style={style}
					data={state.tweets}
					renderItem={renderItem}
					keyExtractor={(item, index) => String(index)}
					ListHeaderComponent={ListHeaderComponent}
					ItemSeparatorComponent={() => (
						<View style={GlobalStyles.tweetSeparator} />
					)}
					refreshing={state.status === "refreshing" ? true : false}
					onRefresh={handleRefresh}
					onEndReached={handleEnd}
					onEndReachedThreshold={0}
					ListFooterComponent={() =>
						state.status === "end"
							? true
							: false || <ActivityIndicator size="large" color="black" />
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
	icon: {
		marginRight: 2,
	},
});
