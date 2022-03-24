/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Help from "../screens/Help";
import Search from "../screens/Search";
import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import Account from "../screens/Account";
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Inbox from "../screens/Inbox";
import Chat from "../screens/Inbox/Chat";
import Stats from "../screens/Account/Stats";
import Player from "../screens/Player";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
			<Stack.Group
				screenOptions={{ presentation: "modal", headerShown: false }}
			>
				<Stack.Screen name="Help" component={Help} />
				<Stack.Screen name="Account" component={Account} />
				<Stack.Screen name="Stats" component={Stats} />
				<Stack.Screen name="Player" component={Player} />
				<Stack.Screen name="Chat" component={Chat} />
				<Stack.Screen name="Search" component={Search} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
				tabBarShowLabel: false,
				headerShown: false,
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={({ navigation }: RootTabScreenProps<"Home">) => ({
					title: "StreamCafé",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home" color={color} />
					),
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate("Help")}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign
								name="infocirlceo"
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name="Inbox"
				component={Inbox}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="message1" color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof AntDesign>["name"];
	color: string;
}) {
	return <AntDesign size={25} style={{ marginBottom: -3 }} {...props} />;
}
