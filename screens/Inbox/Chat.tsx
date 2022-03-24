import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Common/Themed";

export default function Chat() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Chat</Text>
		</View>
	);
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
