import { useCallback, useMemo } from "react";
import { Dimensions, FlatList } from "react-native";
import {
	BottomSheetFlatList,
	BottomSheetModal,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { CustomBackdrop, CustomBackground } from "./ModalStyle";
import { Text, View, BoldText } from "../Themed";
import {
	Button,
	LoadingContainer,
	Section,
	SIZES,
	VideoThumbnai,
} from "../Elements";

import Colors from "../../../constants/Colors";

import useColorScheme from "../../../hooks/useColorScheme";
import { useNavigation } from "@react-navigation/native";

interface ModalProps {
	data: any;
	loading: boolean;
	onClick: any;
	bottomSheetRef: any;
}

const width = Dimensions.get("window").width;

export default function Modal(props: ModalProps) {
	const colorScheme = useColorScheme();
	const navigation: any = useNavigation();

	const snapPoints = useMemo(() => [width * 0.66, width * 0.55 + 225], []);
	const handleSheetChange = useCallback((index) => {}, []);

	return (
		<BottomSheetModal
			index={0}
			ref={props.bottomSheetRef}
			snapPoints={snapPoints}
			onChange={handleSheetChange}
			backdropComponent={CustomBackdrop}
			backgroundComponent={CustomBackground}
			key={9948929391}
			style={{
				borderRadius: 20,
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.35,
				shadowRadius: 3.8,
				elevation: 10,
			}}
		>
			{false ? (
				<View
					style={{
						width: width,
						height: width * 0.66,
					}}
				>
					<LoadingContainer />
				</View>
			) : (
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							width: width,
							height: width * 0.55,
							padding: "5%",
							backgroundColor: "transparent",
							flexDirection: "row",
							alignItems: "flex-start",
							justifyContent: "space-between",
							zIndex: 9999999999,
						}}
					>
						<VideoThumbnai
							imageUri={`https://picsum.photos/350`}
							onPress={() => console.log("Meow")}
							disabled={true}
							size={width * 0.45}
							width={100}
						/>
						<View
							style={{
								flex: 1,
								backgroundColor: "transparent",
								marginLeft: "2%",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
						>
							<BoldText
								style={{
									fontSize: SIZES.font.title,
									textShadowColor:
										Colors[colorScheme].background,
									textShadowOffset: { height: 2, width: 7 },
									textShadowRadius: 25,
								}}
							>
								Big Buck Bunny
							</BoldText>
							<View
								style={{
									width: "100%",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									marginVertical: 3,
								}}
							>
								<Text
									style={{
										color: Colors[colorScheme]
											.tabIconDefault,
									}}
								>
									120,203 Views
								</Text>
								<Text
									style={{
										backgroundColor:
											Colors[colorScheme].tint,
										color: Colors[colorScheme].background,
										paddingHorizontal: 3,
										marginLeft: 10,
									}}
								>
									34 Saves
								</Text>
							</View>
							<Text
								numberOfLines={3}
								style={{
									flex: 1,
									textShadowColor:
										Colors[colorScheme].background,
									textShadowOffset: { height: 3, width: 7 },
									textShadowRadius: 25,
								}}
							>
								Lorem ipsum dolor est dolor impsum pupsum popo
								bobby dolor esto pesto macha pasta coffee
								heisenberg
							</Text>

							<View
								style={{
									width: "100%",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Button
									title="Play"
									icon={true}
									name="play"
									onPress={() =>
										navigation.navigate("Player", {
											uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
											title: "Big Buck Bunny",
											back: "Home",
										})
									}
								/>
							</View>
						</View>
					</View>
					<View
						style={{ flex: 1, width: "90%", alignSelf: "center" }}
					>
						<Section
							title="Related titles"
							horizontal={true}
							body={
								<BottomSheetScrollView
									horizontal={true}
									style={{ width: "100%" }}
								>
									<FlatList
										data={[300, 310, 320, 330]}
										keyExtractor={(e) => e.toString()}
										contentContainerStyle={{
											justifyContent: "space-between",
										}}
										horizontal={true}
										showsHorizontalScrollIndicator={false}
										renderItem={({ item }) => (
											<VideoThumbnai
												imageUri={`https://picsum.photos/${item}`}
												onPress={props.onClick}
												size={150}
												width={100}
												pressSave={() =>
													console.log("")
												}
											/>
										)}
									/>
								</BottomSheetScrollView>
							}
						/>
					</View>
				</View>
			)}
		</BottomSheetModal>
	);
}
