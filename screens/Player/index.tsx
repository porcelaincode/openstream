import React, { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
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
import Message from "../../components/Inbox/Message";
import DynamicStatusBar from "../../components/Common/StatusBar";
import { useSelector } from "react-redux";
import Room from "../../components/Inbox/Room";

const { height, width } = Dimensions.get("screen");

export default function Player({ route }: any) {
	const colorScheme = useColorScheme();
	const navigation: any = useNavigation();
	const refVideo2: any = useRef(null);
	const flatlist: any = useRef(null);

	const { user } = useSelector((state: any) => state.userReducer);

	const [dimension, setDimension] = useState({
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		padding: StatusBar.currentHeight,
		listPadding: 0,
	});

	const [focus, setFocus] = useState<boolean>(false);
	const [dialogues, setDialogues] = useState<boolean>(false);
	const [fullScreen, setFullScreen] = useState(false);
	const [message, setMessage] = useState({
		meta: false,
		text: "",
		sticker: "",
	});

	const [media, setMedia] = useState({
		id: "",
		name: "",
		meta: {
			type: "",
			duration: "",
			uri: "",
		},
	});

	const [room, setRoom] = useState({
		id: "3rrgefe",
		invited: false,
		owner: {
			id: "",
			name: "",
		},
		seeker: 0,
		members: [],
		messages: [
			{ id: 43, user: { id: 43234 }, message: "" },
			{ id: 45, user: { id: 43238 }, message: "" },
			{ id: 48, user: { id: 43239 }, message: "" },
		],
	});

	const { title, uri, nexturi, back } = route.params;

	/* 
		const [createRoom, {creating}] = useMutation(CREATE_ROOM, {
			variables:{
				user: user.id,
				movie: movie.id,
			},
			onCompleted(data){
				setRoom({id: data.createRoom.id, owner: {id: data.createRoom.owner.id, name: user.name}, ...room}})
			} 
		}) 
	*/

	/* 
		const [sendMessage, {texting}] = useMutation(SEND_MESSAGE, {
			variables:{
				...message,
			},
		}) 
	*/

	/* 
		const [seekSlider, {seeking}] = useMutation(SEEK_SLIDER, {
			variables:{
				room: room.id,
				seeker: room.seeker,
			},
			onCompleted(data){
				sendMessage({
					variables:{
						meta: true,
						text: `User ${user.name} seeked.`
						sticker: ''
					}
				})
			} 
		}) 
	*/

	/*
		const {fetching, subscribeToMore, refetch, networkStatus} = useQuery(FETCH_ROOM, {
			variables:{
				user: user.id
			},
			onCompleted(data){
				data = data.fetchRoom
				if(data.exists){
					setRoom({...room, id: data.id, owner: {id: data.user, name: data.name}, members: data.members})
					 setTimeout(() => {
						this.flatlist.scrollToEnd();
					});
				}
			}
		}) 
	*/

	/*
		useEffect(()=>{
			const unsubscribe = subscribeToMore({
				document: FETCH_ROOM_SUBSCRIBE,
				variables: { id: context?.user?.id },
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev;
					const updatedQueryData = subscriptionData.data.fetchRoom;
					setRoom({...room, messages: updatedQueryData.messages, members: updatedQueryData.members})
					this.flatlist.scrollToEnd();
				})
			});
		},[room])
	*/

	function createInvite() {
		const uri = `${user.name} wants you to join their room. Currently viewing ${media.meta.type}: ${media.name} at @${media.meta.duration}.\nAccept invitation & join their room here: strm.app/j/${room.id}`;
		return uri;
	}

	function handleDialoguePress(dialogue: string) {
		setMessage({ ...message, text: dialogue });
		// sendMessage({variables:{
		// 	room: room.id,
		// 	message: message,
		// }})
		setTimeout(() => {
			setMessage({
				...message,
				text: "",
				sticker: "",
			});
		}, 3000);
	}

	useEffect(() => {
		if (fullScreen) {
			setDimension({
				...dimension,
				width: height,
				height: width,
				padding: 0,
			});
		} else {
			setDimension({
				...dimension,
				width: Dimensions.get("window").width,
				height: 200,
				padding: StatusBar.currentHeight,
			});
		}
	}, [fullScreen]);

	function createWatchParty() {
		// create room
		// createRoom()

		// modify local state
		setRoom({ ...room, invited: true });
	}

	function deleteWatchParty() {
		// delete room
		// deleteRoom();

		// modify local state
		setRoom({ ...room, invited: false });
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
		<>
			<DynamicStatusBar />
			<View
				style={{
					flex: 1,
					paddingTop: dimension.padding,
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
						play: (
							<AntDesign name="play" color={"#fff"} size={45} />
						),
						pause: (
							<AntDesign name="pause" color={"#fff"} size={45} />
						),
						replay: (
							<AntDesign
								name="reload1"
								color={"#fff"}
								size={45}
							/>
						),
						loading: (
							<ActivityIndicator
								color={"#ffffff33"}
								size="large"
							/>
						),
						size: 65,
					}}
					style={{
						videoBackgroundColor: "black",
						controlsBackgroundColor: "black",
						height: fullScreen
							? Dimensions.get("window").width
							: 200,
						width: Dimensions.get("window").width,
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
								paddingHorizontal: fullScreen ? 5 : 0,
								paddingTop: 10,
							}}
						>
							<TouchableOpacity
								style={{ marginHorizontal: "2%" }}
								onPress={async () => {
									if (fullScreen) {
										setFullScreen(false);
										setStatusBarHidden(false, "fade");
										await ScreenOrientation.lockAsync(
											ScreenOrientation.OrientationLock
												.DEFAULT
										);
									} else {
										refVideo2.current.setStatusAsync({
											shouldPlay: true,
										});
										navigation.navigate(back);
									}
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
						onValueChange: (event) => {
							setRoom({ ...room, seeker: event });
							// seekSlider();
						},
						thumbTintColor: Colors[colorScheme].tint,
						minimumTrackTintColor:
							Colors[colorScheme].tabIconSelected,
						maximumTrackTintColor:
							Colors[colorScheme].tabIconDefault,
					}}
					defaultControlsVisible={true}
				/>
				{!fullScreen &&
					(room.invited ? (
						<Room
							media={media}
							room={room}
							fullScreen={false}
							loading={false}
							onBack={() => {}}
							onDelete={deleteWatchParty}
						/>
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
										color={
											Colors[colorScheme].tabIconSelected
										}
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
													navigation.navigate(
														"Search",
														{
															back: "Player",
														}
													)
												}
												active={false}
												text={item}
											/>
										)}
									/>
								}
							/>
							{room.invited ? (
								<Button
									name="sync"
									title="Join Watch Party"
									onPress={createWatchParty}
									fullWidth={true}
									icon={true}
								/>
							) : (
								<Button
									name="user"
									title="Create Watch Party"
									onPress={createWatchParty}
									fullWidth={true}
									icon={true}
								/>
							)}
						</View>
					))}
			</View>
		</>
	);
}
