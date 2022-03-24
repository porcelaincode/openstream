import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import {
	CommonStyles,
	Screen,
	SearchInput,
	SIZES,
} from "../../components/Common/Elements";

import { BoldText, Text, View } from "../../components/Common/Themed";
import Colors from "../../constants/Colors";

export default function Inbox() {
	const colorScheme = useColorScheme();
	const navigation: any = useNavigation();

	const [search, setSearch] = useState<string>("");

	return (
		<Screen>
			<View style={CommonStyles.header}>
				<View />
				<View style={CommonStyles.screenTitle}>
					<BoldText style={{ fontSize: SIZES.font.header }}>
						Inbox
					</BoldText>
				</View>
			</View>

			<SearchInput
				value={search}
				onChange={setSearch}
				placeholder="Search user"
				key={9943842555}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});
