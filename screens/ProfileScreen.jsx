import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Linking,
	ActivityIndicator,
} from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import TweetsList from "../components/TweetsList";
import { EvilIcons } from "@expo/vector-icons";
import format from "date-fns/format";
import useFetch from "../utils/hooks/useFetch";

export default function ProfileScreen({ route, navigation }) {
	const {
		status,
		data: user,
		error,
	} = useFetch(`/users/${route.params.userId}`);

	const profileHeader = () => (
		<View style={GlobalStyles.container}>
			{status === "error" ? (
				<Text style={GlobalStyles.textRed}>{error.message}</Text>
			) : (
				<>
					<Image
						style={styles.backgroundImage}
						source={{
							uri: "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
						}}
					/>
					<View
						style={[
							GlobalStyles.flexRow,
							GlobalStyles.spaceBetween,
							styles.avatarContainer,
						]}
					>
						<Image style={styles.avatar} source={{ uri: user.avatar }} />
						<TouchableOpacity style={styles.followButton}>
							<Text style={styles.followButtonText}>Follow</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.profileContainer}>
						<Text style={styles.profileName}>{user.name}</Text>
						<Text style={styles.profileHandle}>@{user.username}</Text>
					</View>
					<View style={styles.descriptionContainer}>
						<Text style={styles.description}>{user.profile}</Text>
					</View>
					<View style={[GlobalStyles.flexRow, styles.locationContainer]}>
						<EvilIcons name="location" size={24} color="gray" />
						<Text style={GlobalStyles.textGray}>{user.location}</Text>
					</View>
					<View style={[GlobalStyles.flexRow, styles.linkContainer]}>
						<TouchableOpacity
							style={GlobalStyles.flexRow}
							onPress={() => Linking.openURL(user.link)}
						>
							<EvilIcons name="link" size={24} color="gray" />
							<Text style={GlobalStyles.textBlue}>{user.linkText}</Text>
						</TouchableOpacity>
						<View style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
							<EvilIcons name="calendar" size={24} color="gray" />
							<Text style={GlobalStyles.textGray}>
								Joined {format(new Date(user.created_at), "MMM yyyy")}
							</Text>
						</View>
					</View>
					<View style={[GlobalStyles.flexRow, styles.followContainer]}>
						<View style={GlobalStyles.flexRow}>
							<Text style={styles.followNumber}>509</Text>
							<Text style={styles.followLabel}>Following</Text>
						</View>
						<View style={[GlobalStyles.ml4, GlobalStyles.flexRow]}>
							<Text style={styles.followNumber}>2,354</Text>
							<Text style={styles.followLabel}>Followers</Text>
						</View>
					</View>
					<View style={GlobalStyles.tweetSeparator} />
				</>
			)}
		</View>
	);

	return (
		<>
			{status === "fetching" ? (
				<ActivityIndicator size="large" color="#007aff" />
			) : (
				<TweetsList
					url={`/users/${route.params.userId}/tweets`}
					user={user}
					style={GlobalStyles.container}
					ListHeaderComponent={profileHeader}
					navigation={navigation}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	backgroundImage: {
		width: 800,
		height: 120,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 4,
		borderColor: "white",
	},
	avatarContainer: {
		alignItems: "flex-end",
		paddingHorizontal: 10,
		marginTop: -34,
	},
	followButton: {
		backgroundColor: "#0f1418",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 24,
	},
	followButtonText: {
		color: "white",
		fontWeight: "bold",
	},
	profileContainer: {
		paddingHorizontal: 10,
		paddingVertical: 2,
	},
	profileName: {
		fontWeight: "bold",
		fontSize: 22,
	},
	profileHandle: {
		color: "gray",
		marginTop: 1,
	},
	description: {
		lineHeight: 22,
	},
	descriptionContainer: {
		paddingHorizontal: 10,
		marginTop: 8,
	},
	locationContainer: {
		paddingHorizontal: 10,
		marginTop: 12,
	},
	linkContainer: {
		paddingHorizontal: 10,
		marginTop: 4,
	},
	followContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
	followNumber: {
		fontWeight: "bold",
	},
	followLabel: {
		marginLeft: 4,
	},
});
