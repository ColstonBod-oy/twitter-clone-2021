import React from "react";
import { View } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import TweetsList from "../components/TweetsList";
import FloatingButton from "../components/FloatingButton";

export default function ExploreScreen({ route, navigation }) {
	return (
		<View style={GlobalStyles.container}>
			<TweetsList
				url={"/tweets_all"}
				newTweet={route.params?.newTweet}
				navigation={navigation}
			/>
			<FloatingButton navigation={navigation} />
		</View>
	);
}
