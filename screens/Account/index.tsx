import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Button, Header, Screen } from "../../components/Common/Elements";

import { Text, View } from "../../components/Common/Themed";

export default function Account() {
	const navigation: any = useNavigation();
	return (
		<Screen>
			<Header
				title="Account"
				onBack={() => navigation.navigate("Home")}
				key={9439239443}
			/>
			<Button
				title="Stats"
				onPress={() => navigation.navigate("Stats")}
				fullWidth={true}
				icon={true}
				name="barchart"
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});
