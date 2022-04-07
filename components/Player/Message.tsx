import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { View, Text, BoldText } from "../Common/Themed";

import useColorScheme from "../../hooks/useColorScheme";

import Colors from "../../constants/Colors";
import Sticker, { SIZES } from "../Common/Elements";

interface MessageProps {
	data: any;
	fromUser: boolean;
	time: string;
	sticker?: string;
	lastMessageUserSame?: boolean;
}

export default function Message(props: MessageProps) {
	const colorScheme = useColorScheme();
	const [showTime, setShowTime] = useState(false);

	function handleMessagePress() {
		setShowTime(!showTime);
	}

	return (
		<View
			style={{
				flexDirection: !props.fromUser ? "row" : "row-reverse",
				maxWidth: "80%",
				alignSelf: props.fromUser ? "flex-end" : "flex-start",
				alignItems: "flex-start",
			}}
		>
			{!props.fromUser && !props.lastMessageUserSame && (
				<View
					style={{
						borderRadius: 5,
						padding: 5,
						marginTop: 5,
						marginRight: 10,
						backgroundColor: Colors[colorScheme].inputbg,
						alignItems: "center",
						justifyContent: "center",
						height: SIZES.font.header + 5,
						width: SIZES.font.header + 5,
					}}
				>
					<BoldText
						style={{
							fontSize: SIZES.font.text,
						}}
					>
						N
					</BoldText>
				</View>
			)}

			<View
				style={{
					flexDirection: "column",
					width: "100%",
					marginBottom: 5,
					alignItems: props.fromUser ? "flex-end" : "flex-start",
				}}
			>
				{!props.fromUser && (
					<Text
						style={{
							color: Colors[colorScheme].tabIconDefault,
							fontSize: SIZES.font.small,
						}}
					>
						Username
					</Text>
				)}
				{props.sticker ? (
					<TouchableOpacity
						style={{
							...styles.container,
							alignSelf: props.fromUser
								? "flex-end"
								: "flex-start",
						}}
					>
						<Sticker uri={props.sticker} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={{
							...styles.container,
							alignSelf: props.fromUser
								? "flex-end"
								: "flex-start",
							borderBottomLeftRadius: !props.fromUser ? 0 : 10,
							borderBottomRightRadius: props.fromUser ? 0 : 10,
							backgroundColor: props.fromUser
								? Colors[colorScheme].tint
								: Colors[colorScheme].background,

							borderWidth: 1,
							borderColor: props.fromUser
								? Colors[colorScheme].background
								: Colors[colorScheme].text,
						}}
						activeOpacity={SIZES.opacity.active}
						onPress={handleMessagePress}
					>
						<Text
							style={{
								color: props.fromUser
									? Colors[colorScheme].background
									: Colors[colorScheme].text,
								fontSize: SIZES.font.text,
							}}
						>
							{props.data}
						</Text>
					</TouchableOpacity>
				)}
				{showTime && (
					<Text
						style={{
							color: Colors[colorScheme].tabIconDefault,
							fontSize: SIZES.font.small,
						}}
					>
						{props.time}
					</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		padding: 10,
	},
});
