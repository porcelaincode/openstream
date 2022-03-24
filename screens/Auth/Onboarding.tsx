import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { Text, View } from "../../components/Common/Themed";
import { CommonStyles, Screen, SIZES } from "../../components/Common/Elements";
import Logo from "../../components/Common/Logo";

export default function Onboarding() {
	const navigation: any = useNavigation();
	const { user } = useSelector((state: any) => state.userReducer);

	useEffect(() => {
		if (user) {
			navigation.navigate("Root");
		}
	}, [user]);

	return (
		<Screen>
			<View style={CommonStyles.header}>
				<Logo size={SIZES.font.header} />
				<View />
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({});
