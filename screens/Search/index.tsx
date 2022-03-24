import React, { useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Header, Screen, SearchInput } from "../../components/Common/Elements";
import Modal from "../../components/Common/Modal";

export default function Search() {
	const colorScheme = useColorScheme();
	const navigation: any = useNavigation();
	const [search, setSearch] = useState<string>("");

	// hooks
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["25%", "50%"], []);
	const handleSheetChange = useCallback((index) => {}, []);

	return (
		<>
			<Modal
				onClick={() => console.log("")}
				bottomSheetRef={bottomSheetRef}
				snapPoints={snapPoints}
				handleChange={handleSheetChange}
			/>
			<Screen>
				<Header
					onBack={() => {
						setSearch("");
						navigation.navigate("Home");
					}}
					title="Search"
					key={9439485942}
				/>
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder="Search titles"
					key={9943842934}
					autoFocus={true}
				/>
			</Screen>
		</>
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
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
