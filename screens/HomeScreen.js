import React, { useState, useEffect } from "react";
import { View } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import TweetsList from "../components/TweetsList";
import FloatingButton from "../components/FloatingButton";
import axios from "axios";

export default function HomeScreen({ navigation }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		getAllTweets();
	}, []);

	function getAllTweets() {
		axios
			.get("http://10.0.2.2:8000/api/tweets")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<View style={GlobalStyles.container}>
			<TweetsList data={data} navigation={navigation} />
			<FloatingButton navigation={navigation} />
		</View>
	);
}
