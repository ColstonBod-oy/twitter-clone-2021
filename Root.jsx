import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import NewTweetScreen from "./screens/NewTweetScreen";
import TweetScreen from "./screens/TweetScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SearchScreen from "./screens/SearchScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import { AuthContext } from "./context/AuthProvider";
import LogInScreen from "./screens/Auth/LogInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";

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
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={SearchScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="search" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="notifications" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default function Root() {
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size="large" color="gray" />
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
