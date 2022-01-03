import React from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Platform,
	StyleSheet,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
	const DATA = [
		{
			id: "1",
			title: "First Item",
		},
		{
			id: "2",
			title: "Second Item",
		},
		{
			id: "3",
			title: "Third Item",
		},
		{
			id: "4",
			title: "Fourth Item",
		},
		{
			id: "5",
			title: "Fifth Item",
		},
		{
			id: "6",
			title: "Sixth Item",
		},
		{
			id: "7",
			title: "Seventh Item",
		},
		{
			id: "8",
			title: "Eight Item",
		},
		{
			id: "9",
			title: "Ninth Item",
		},
		{
			id: "10",
			title: "Tenth Item",
		},
	];

	function gotoProfile() {
		navigation.navigate("Profile Screen");
	}

	function gotoSingleTweet() {
		navigation.navigate("Tweet Screen");
	}

	function gotoNewTweet() {
		navigation.navigate("New Tweet Screen");
	}

	const renderItem = ({ item }) => (
		<View style={[styles.flexRow, styles.tweetContainer]}>
			<TouchableOpacity onPress={() => gotoProfile()}>
				<Image
					style={styles.avatar}
					source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
				/>
			</TouchableOpacity>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={styles.flexRow}
					onPress={() => gotoSingleTweet()}
				>
					<Text style={styles.tweetName} numberOfLines={1}>
						{item.title}
					</Text>
					<Text style={styles.tweetHandle} numberOfLines={1}>
						@drehimself
					</Text>
					<Text>&middot;</Text>
					<Text style={styles.tweetHandle} numberOfLines={1}>
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
				<View style={[styles.flexRow, styles.tweetEngagement]}>
					<TouchableOpacity style={styles.flexRow}>
						<EvilIcons
							name="comment"
							size={22}
							color="gray"
							style={{ marginRight: 2 }}
						/>
						<Text style={styles.textGray}>456</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.ml4, styles.flexRow]}>
						<EvilIcons
							name="retweet"
							size={22}
							color="gray"
							style={{ marginRight: 2 }}
						/>
						<Text style={styles.textGray}>32</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.ml4, styles.flexRow]}>
						<EvilIcons
							name="heart"
							size={22}
							color="gray"
							style={{ marginRight: 2 }}
						/>
						<Text style={styles.textGray}>4,456</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.ml4, styles.flexRow]}>
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
		<View style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
			/>
			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => gotoNewTweet()}
			>
				<AntDesign name="plus" size={24} color="black" />
			</TouchableOpacity>
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
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	textGray: {
		color: "gray",
	},
	floatingButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1d9bf1",
		position: "absolute",
		bottom: 20,
		right: 12,
	},
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
	tweetSeparator: {
		borderBottomWidth: 1,
		borderBottomColor: "#e5e7eb",
	},
	tweetName: {
		fontWeight: "bold",
		color: "#222222",
	},
	tweetHandle: {
		marginHorizontal: 8,
		color: "gray",
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
