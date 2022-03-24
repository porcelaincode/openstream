import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { Header, Screen } from "../../../components/Common/Elements";
import { Text, View } from "../../../components/Common/Themed";

export default function Stats() {
	const navigation: any = useNavigation();
	return (
		<Screen>
			<Header
				title="Stats"
				onBack={() => navigation.navigate("Account")}
				key={9411139443}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});
