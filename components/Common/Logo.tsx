import React from "react";
import { TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { BoldText, Text } from "./Themed";

interface LogoProps {
	onPress?: any;
	size?: number;
}

export default function Logo(props: LogoProps) {
	const colorScheme = useColorScheme();

	return (
		<TouchableOpacity onPress={props.onPress}>
			<Text style={{ fontSize: props.size || 18 }}>
				Open
				<BoldText style={{ color: Colors[colorScheme].tint }}>
					Stream
				</BoldText>
			</Text>
		</TouchableOpacity>
	);
}
