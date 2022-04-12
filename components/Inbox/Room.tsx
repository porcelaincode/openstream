import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import {
	BoldText,
	Text,
	TextInput,
	View,
} from "../../components/Common/Themed";
import { CategoryBtn, SIZES } from "../../components/Common/Elements";
import Message from "./Message";

import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import DynamicStatusBar from "../Common/StatusBar";
import Icons from "../Common/Icons";

interface RoomProps {
	fullScreen: boolean;
	loading: boolean;
	room: any;
	media: any;
	onDelete: any;
	onBack: any;
}

export default function Room(props: RoomProps) {
	const colorScheme = useColorScheme();
	const flatlist: any = useRef(null);

	const { user } = useSelector((state: any) => state.userReducer);

	const [focus, setFocus] = useState<boolean>(false);
	const [dialogues, setDialogues] = useState<boolean>(false);
	const [message, setMessage] = useState({
		meta: false,
		text: "",
		sticker: "",
	});

	/* 
		const [sendMessage, {texting}] = useMutation(SEND_MESSAGE, {
			variables:{
				...message,
			},
		}) 
	*/

	function createInvite() {
		const uri = `${user.name} wants you to join their room. Currently viewing ${props.media.meta.type}: ${props.media.name} at @${props.media.meta.duration}.\nAccept invitation & join their room here: strm.app/j/${props.room.id}`;
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

	if (props.loading) {
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
			{props.fullScreen && <DynamicStatusBar />}
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
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{props.fullScreen && (
							<TouchableOpacity
								style={{ marginRight: 10 }}
								onPress={props.onBack}
							>
								<AntDesign
									name="back"
									size={SIZES.icon.header}
									color={Colors[colorScheme].tint}
								/>
							</TouchableOpacity>
						)}
						<BoldText style={{ fontSize: SIZES.font.header - 8 }}>
							<BoldText
								style={{
									color: Colors[colorScheme].tabIconDefault,
								}}
							>
								Id:
							</BoldText>{" "}
							{props.room.id}
						</BoldText>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<TouchableOpacity onPress={createInvite}>
							<AntDesign
								name="sharealt"
								size={SIZES.icon.header}
								color={Colors[colorScheme].tint}
							/>
						</TouchableOpacity>

						{/* render only for room owner */}
						<TouchableOpacity
							style={{ marginLeft: 15 }}
							onPress={props.onDelete}
						>
							<AntDesign
								name="delete"
								size={SIZES.icon.header}
								color={Colors[colorScheme].tint}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={{ marginLeft: 15 }}
							onPress={() => console.log("")}
						>
							<AntDesign
								name="infocirlceo"
								size={SIZES.icon.header}
								color={Colors[colorScheme].tint}
							/>
						</TouchableOpacity>
					</View>
				</View>
				{!props.fullScreen && (
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: 5,
						}}
					>
						<Icons data={props.room.members} />
					</View>
				)}
				<View style={{ flex: 1 }}>
					<FlatList
						ref={(ref) => {
							flatlist.current = ref;
						}}
						data={props.room.messages}
						keyExtractor={(e: any) => e.id.toString()}
						inverted={true}
						renderItem={({ item, index }) => (
							<Message
								data="this movie is good"
								fromUser={item.user.id === user?.id || false}
								time="12:52 pm"
							/>
						)}
						// onEndReached={()=>refetch}
					/>
					{dialogues && (
						<View style={{ width: "100%", marginTop: 10 }}>
							<FlatList
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								data={[
									"WOAH!",
									"Pause!",
									"Change movie",
									"Let's stop here",
									"Lobby",
								]}
								keyExtractor={(e) => e}
								renderItem={({ item }) => (
									<CategoryBtn
										onPress={() =>
											handleDialoguePress(item)
										}
										text={item}
										active={false}
									/>
								)}
							/>
						</View>
					)}
					<View
						style={{
							flexDirection: "row",
							alignItems: "flex-start",
							padding: 10,
							borderRadius: 5,
							marginVertical: 5,
							height: 50,
							maxHeight: 100,
							borderWidth: 1,
							borderColor: focus
								? Colors[colorScheme].tabIconDefault
								: Colors[colorScheme].inputbg,
						}}
					>
						<TextInput
							placeholder="Your Message"
							placeholderTextColor={
								Colors[colorScheme].tabIconDefault
							}
							onChangeText={(text: string) =>
								setMessage({
									...message,
									text: text,
								})
							}
							selectionColor={Colors[colorScheme].tint}
							// multiline={true}
							value={message.text}
							style={{
								flex: 1,
								color: Colors[colorScheme].text,
								fontSize: SIZES.font.text,
							}}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
						{message.text.length > 0 ? (
							<TouchableOpacity
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
											? Colors[colorScheme].tabIconDefault
											: Colors[colorScheme].tint
									}
								/>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								onPress={() => setDialogues(!dialogues)}
							>
								<Ionicons
									name={
										dialogues
											? "chatbubble-ellipses-outline"
											: "chatbubble-ellipses"
									}
									size={SIZES.font.header}
									color={
										dialogues
											? Colors[colorScheme].tint
											: Colors[colorScheme].tabIconDefault
									}
								/>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
		</>
	);
}
