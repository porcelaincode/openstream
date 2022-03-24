import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Header, Screen } from "../../components/Common/Elements";

import { Text, View } from "../../components/Common/Themed";

export default function Login() {
	const navigation: any = useNavigation();
	return (
		<Screen>
			<Header
				title="Login"
				onBack={() => navigation.navigate("Onboarding")}
				key={9422239443}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});
