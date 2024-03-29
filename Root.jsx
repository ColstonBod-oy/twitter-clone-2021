import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import NewTweetScreen from "./screens/NewTweetScreen";
import TweetScreen from "./screens/TweetScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ExploreScreen from "./screens/ExploreScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import { AuthContext } from "./helpers/AuthProvider";
import LogInScreen from "./screens/sso/LogInScreen";
import SignUpScreen from "./screens/sso/SignUpScreen";
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
			<Stack.Screen
				name="Bottom Tab"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="New Tweet Screen"
				component={NewTweetScreen}
				options={{ title: "" }}
			/>
			<Stack.Screen
				name="Tweet Screen"
				component={TweetScreen}
				options={{ title: "" }}
			/>
			<Stack.Screen
				name="Profile Screen"
				component={ProfileScreen}
				options={{ title: "" }}
			/>
		</Stack.Navigator>
	);
};

const AuthStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
			<Stack.Screen
				name="Log In Screen"
				component={LogInScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Sign Up Screen"
				component={SignUpScreen}
				options={{ title: "" }}
			/>
		</Stack.Navigator>
	);
};

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen
				name="Home2"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ size, focused }) => (
						<Ionicons
							name="home"
							size={size}
							color={focused ? "black" : "gray"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Explore"
				component={ExploreScreen}
				options={{
					tabBarIcon: ({ size, focused }) => (
						<MaterialIcons
							name="explore"
							size={size}
							color={focused ? "black" : "gray"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					tabBarIcon: ({ size, focused }) => (
						<Ionicons
							name="notifications"
							size={size}
							color={focused ? "black" : "gray"}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default function Root() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { user, setUser } = useContext(AuthContext);

	useEffect(() => {
		SecureStore.getItemAsync("user")
			.then((userString) => {
				if (userString) {
					setUser(JSON.parse(userString));
				}
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<View style={styles.activityIndicatorContainer}>
				{error && <Text style={{ color: "red" }}>{error}</Text>}
				{isLoading && <ActivityIndicator size="large" color="black" />}
			</View>
		);
	}

	return (
		<>
			{user ? (
				<NavigationContainer>
					<Drawer.Navigator initialRouteName="Home">
						<Drawer.Screen name="Home" component={HomeStackNavigator} />
						<Drawer.Screen name="Settings" component={SettingsScreen} />
					</Drawer.Navigator>
				</NavigationContainer>
			) : (
				<NavigationContainer>
					<AuthStackNavigator />
				</NavigationContainer>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	activityIndicatorContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
