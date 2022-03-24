import { Platform, StyleSheet } from "react-native";
import { Screen } from "../components/Common/Elements";

import { Text, View } from "../components/Common/Themed";

export default function Help() {
	return <Screen></Screen>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
