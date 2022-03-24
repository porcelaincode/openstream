import React, { useRef, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	StatusBar,
	TouchableOpacity,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { Video } from "expo-av";
import { setStatusBarHidden } from "expo-status-bar";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import VideoPlayer from "expo-video-player";

import {
	BoldText,
	Text,
	TextInput,
	View,
} from "../../components/Common/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import {
	Button,
	CategoryBtn,
	Section,
	SIZES,
} from "../../components/Common/Elements";
import Message from "../../components/Player/Message";

export default function Player({ route }: any) {
	const colorScheme = useColorScheme();
	const navigation: any = useNavigation();
	const refVideo2: any = useRef(null);

	const [focus, setFocus] = useState<boolean>(false);
	const [fullScreen, setFullScreen] = useState(false);
	const [message, setMessage] = useState({
		text: "",
		sticker: "",
	});
	const [room, setRoom] = useState({
		id: "",
		invited: false,
		owner: {
			id: "",
			name: "",
		},
		participants: [
			{
				id: "",
				name: "",
			},
		],
	});

	const { title, uri, nexturi, back } = route.params;

	function createWatchParty() {
		// create room
		// ask which users to invite
		// modify local state
	}

	if (false) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: Colors[colorScheme].background,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator
					size="large"
					color={Colors[colorScheme].tint}
				/>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				paddingTop: fullScreen ? 0 : StatusBar.currentHeight + 15,
			}}
		>
			<VideoPlayer
				videoProps={{
					shouldPlay: false,
					resizeMode: Video.RESIZE_MODE_CONTAIN,
					isLooping: false,
					source: {
						uri: uri,
					},
					ref: refVideo2,
				}}
				fullscreen={{
					inFullscreen: fullScreen,
					enterFullscreen: async () => {
						setStatusBarHidden(true, "fade");
						setFullScreen(true);
						await ScreenOrientation.lockAsync(
							ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
						);
						refVideo2.current.setStatusAsync({
							shouldPlay: true,
						});
					},
					exitFullscreen: async () => {
						setStatusBarHidden(false, "fade");
						setFullScreen(false);
						await ScreenOrientation.lockAsync(
							ScreenOrientation.OrientationLock.DEFAULT
						);
					},
					visible: true,
				}}
				textStyle={{ fontSize: 16 }}
				icon={{
					play: <AntDesign name="play" color={"#fff"} size={45} />,
					pause: <AntDesign name="pause" color={"#fff"} size={45} />,
					replay: (
						<AntDesign name="reload1" color={"#fff"} size={45} />
					),
					loading: (
						<ActivityIndicator color={"#ffffff33"} size="large" />
					),
					size: 65,
				}}
				style={{
					videoBackgroundColor: "black",
					controlsBackgroundColor: "black",
					height: fullScreen ? Dimensions.get("window").height : 200,
					width: fullScreen
						? Dimensions.get("window").width
						: Dimensions.get("window").width,
				}}
				header={
					<View
						style={{
							width: "100%",
							backgroundColor: "transparent",
							alignSelf: "center",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<TouchableOpacity
							style={{ marginHorizontal: "2%" }}
							onPress={async () => {
								refVideo2.current.setStatusAsync({
									shouldPlay: true,
								});

								await ScreenOrientation.lockAsync(
									ScreenOrientation.OrientationLock.DEFAULT
								);
								navigation.navigate(back);
							}}
						>
							<AntDesign name="back" size={25} color="#fff" />
						</TouchableOpacity>

						{fullScreen ? (
							<TouchableOpacity
								style={{ marginHorizontal: "2%" }}
								onPress={async () => {
									setStatusBarHidden(false, "fade");
									setFullScreen(false);
									await ScreenOrientation.lockAsync(
										ScreenOrientation.OrientationLock
											.DEFAULT
									);
								}}
							>
								<AntDesign
									name="message1"
									size={25}
									color="#fff"
								/>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								style={{ marginHorizontal: "2%" }}
							>
								<Ionicons
									name="ellipsis-vertical"
									size={25}
									color="#fff"
								/>
							</TouchableOpacity>
						)}
					</View>
				}
				slider={{
					visible: true,
					thumbTintColor: Colors[colorScheme].tint,
					minimumTrackTintColor: Colors[colorScheme].tabIconSelected,
					maximumTrackTintColor: Colors[colorScheme].tabIconDefault,
				}}
				defaultControlsVisible={true}
			/>
			{!fullScreen &&
				(!room.invited ? (
					<View
						style={{
							flex: 1,
							width: "95%",
							alignSelf: "center",
							marginTop: 10,
						}}
					>
						<View
							style={{
								width: "100%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<BoldText
								style={{ fontSize: SIZES.font.header - 8 }}
							>
								<BoldText
									style={{
										color: Colors[colorScheme]
											.tabIconDefault,
									}}
								>
									Id:
								</BoldText>{" "}
								3rrgefe
							</BoldText>
							<TouchableOpacity>
								<AntDesign
									name="sharealt"
									size={SIZES.icon.header}
									color={Colors[colorScheme].tint}
								/>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1 }}>
							<FlatList
								data={[
									{ id: 43, fromUser: false },
									{ id: 45, fromUser: true },
									{ id: 48, fromUser: false },
									{ id: 41, fromUser: false },
									{ id: 42, fromUser: true },
									{ id: 49, fromUser: false },
								]}
								keyExtractor={(e: any) => e.id.toString()}
								renderItem={({ item }) => (
									<Message
										data="this movie is good"
										fromUser={item.fromUser}
										time="12"
									/>
								)}
								ListFooterComponent={
									<View
										style={{
											flexDirection: "row",
											alignItems: "flex-start",
											width: "100%",
											marginBottom: 10,
											padding: 10,
											borderRadius: 5,
											borderWidth: 1,
											borderColor: focus
												? Colors[colorScheme]
														.tabIconDefault
												: Colors[colorScheme].inputbg,
										}}
									>
										<TextInput
											placeholder="Message"
											placeholderTextColor={
												Colors[colorScheme]
													.tabIconDefault
											}
											onChangeText={(text) =>
												setMessage({
													...message,
													text: text,
												})
											}
											selectionColor={
												Colors[colorScheme].tint
											}
											multiline={true}
											value={message.text}
											style={{
												flex: 1,
												color: Colors[colorScheme].text,
												fontSize: SIZES.font.text,
											}}
											// onFocus={() => setFocus(true)}
											// onBlur={() => setFocus(false)}
										/>
										<TouchableOpacity
											style={{ marginRight: 10 }}
											disabled={message.text.length === 0}
										>
											<Ionicons
												name={
													message.text.length === 0
														? "send-outline"
														: "send"
												}
												size={SIZES.font.header}
												color={
													message.text.length === 0
														? Colors[colorScheme]
																.tabIconDefault
														: Colors[colorScheme]
																.tint
												}
											/>
										</TouchableOpacity>
									</View>
								}
							/>
						</View>
					</View>
				) : (
					<View
						style={{
							flex: 1,
							width: "95%",
							alignSelf: "center",
							marginTop: 10,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "flex-start",
								justifyContent: "space-between",
							}}
						>
							<BoldText
								style={{
									fontSize: SIZES.font.header,
									maxWidth: "80%",
								}}
								numberOfLines={2}
							>
								{title}
							</BoldText>
							<TouchableOpacity style={{ marginTop: 10 }}>
								<AntDesign
									name="hearto"
									size={23}
									color={Colors[colorScheme].tabIconSelected}
								/>
							</TouchableOpacity>
						</View>
						<Text
							style={{
								fontSize: SIZES.font.text,
								marginBottom: 10,
							}}
						>
							Lorem ipsum dolor est
						</Text>

						<Section
							title="Tags"
							horizontal={true}
							body={
								<FlatList
									data={[
										"Quick Snack",
										"Horror",
										"Entertainment",
									]}
									numColumns={3}
									keyExtractor={(e) => e}
									renderItem={({ item }) => (
										<CategoryBtn
											onPress={() =>
												navigation.navigate("Search", {
													back: "Player",
												})
											}
											active={false}
											text={item}
										/>
									)}
								/>
							}
						/>
						<Button
							name="user"
							title="Create Watch Party"
							onPress={createWatchParty}
							fullWidth={true}
							icon={true}
						/>
					</View>
				))}
		</View>
	);
}
