import React from "react";
import { View, BoldText } from "./Themed";

import useColorScheme from "../../hooks/useColorScheme";

import { SIZES } from "./Elements";
import Colors from "../../constants/Colors";

interface IconsProps {
	data: any;
}

export default function Icons(props: IconsProps) {
	const colorScheme = useColorScheme();

	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			{props.data.map((obj: any, index: number) => (
				<View
					style={{
						height: 38,
						width: 38,
						backgroundColor: Colors[colorScheme].inputbg,
						borderWidth: 2,
						borderColor: Colors[colorScheme].background,
						borderRadius: 20,
						alignItems: "center",
						justifyContent: "center",
						position: "absolute",
						marginLeft: index * 39,
					}}
				>
					<BoldText style={{ fontSize: SIZES.font.text }}>
						{obj.name.splice(1, 2)}
					</BoldText>
				</View>
			))}
		</View>
	);
}
