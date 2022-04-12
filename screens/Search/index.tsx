import React, { useEffect, useState, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, useColorScheme } from "react-native";
import { Header, Screen, SearchInput } from "../../components/Common/Elements";
import Modal from "../../components/Common/Modal";
import ResultList from "../../components/Search/ResultList";

export default function Search() {
	const colorScheme = useColorScheme();
	const navigation: any = useNavigation();
	const [search, setSearch] = useState<string>("");
	const [activeTitle, setActiveTitle] = useState<any>(null);

	// hooks
	const bottomSheetRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		if (activeTitle) {
			bottomSheetRef.current?.present();
		} else {
			bottomSheetRef.current?.close();
		}
	}, [activeTitle]);

	return (
		<>
			{activeTitle && (
				<Modal
					data={activeTitle}
					loading={false}
					onClick={() => console.log("")}
					bottomSheetRef={bottomSheetRef}
				/>
			)}
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
				<ResultList
					loading={false}
					data={[320, 450, 550, 650]}
					onClick={(item: any) => setActiveTitle(item)}
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
