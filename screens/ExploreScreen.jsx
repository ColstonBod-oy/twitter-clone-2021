import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AuthContext } from "../helpers/AuthProvider";
import axiosConfig from "../utils/axiosConfig";
import format from "date-fns/format";

export default function ExploreScreen() {
	const { user } = useContext(AuthContext);
	const [error, setError] = useState(null);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		axiosConfig.defaults.headers.common[
			"Authorization"
		] = `Bearer ${user.token}`;

		axiosConfig
			.get("/user")
			.then((response) => {
				setUserData(response.data);
				setError(null);
			})
			.catch((error) => {
				setError(error.response.data.message);
			});
	}, []);

	return (
		<View style={styles.userDataContainer}>
			{error && <Text style={{ color: "red" }}>{error}</Text>}
			{userData && (
				<>
					<Image style={styles.avatar} source={{ uri: userData.avatar }} />
					<Text>Name: {userData.name}</Text>
					<Text>Username: {userData.username}</Text>
					<Text>Email: {userData.email}</Text>
					<Text>
						Verified at:{" "}
						{format(new Date(userData.email_verified_at), "MMM dd yyyy")}
					</Text>
					<Text>Location: {userData.location}</Text>
					<Text>
						Joined at: {format(new Date(userData.created_at), "MMM dd yyyy")}
					</Text>
					<Text>
						Updated at: {format(new Date(userData.updated_at), "MMM dd yyyy")}
					</Text>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 25,
	},
	userDataContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
