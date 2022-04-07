import { useCallback, useMemo, useRef } from "react";
import {
	FlatList,
	RefreshControl,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";

import { BoldText, Text, View } from "../../components/Common/Themed";
import {
	CategoryBtn,
	CommonStyles,
	Screen,
	Section,
	SIZES,
	VideoThumbnai,
} from "../../components/Common/Elements";
import Modal from "../../components/Common/Modal";
import Logo from "../../components/Common/Logo";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
	const colorScheme = useColorScheme();
	const navigation: any = useNavigation();
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
				<View style={CommonStyles.header}>
					<Logo size={SIZES.font.header} />
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "transparent",
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("Account")}
							activeOpacity={SIZES.opacity.active}
						>
							<AntDesign
								name="user"
								size={SIZES.icon.header}
								color={Colors[colorScheme].text}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity
					style={{
						...styles.search,
						backgroundColor: Colors[colorScheme].inputbg,
					}}
					delayPressIn={0}
					activeOpacity={SIZES.opacity.active}
					onPress={() => navigation.navigate("Search")}
				>
					<AntDesign
						name="search1"
						color={Colors[colorScheme].inputtext}
						size={SIZES.icon.normal}
					/>
					<View
						style={{
							flex: 1,
							marginLeft: 10,
							backgroundColor: "transparent",
						}}
					>
						<Text
							style={{
								fontSize: SIZES.font.text,
								color: Colors[colorScheme].inputtext,
							}}
						>
							Search titles
						</Text>
					</View>
				</TouchableOpacity>

				<FlatList
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							onRefresh={() => console.log("")}
							refreshing={false}
							progressBackgroundColor={
								Colors[colorScheme].inputbg
							}
							colors={[Colors[colorScheme].tint]}
						/>
					}
					renderItem={() => <View />}
					data={[1]}
					keyExtractor={(e) => e.toString()}
					ListHeaderComponent={
						<>
							<Section
								title="Pick up where you left"
								horizontal={true}
								body={
									<View
										style={{
											width: "100%",
										}}
									>
										<FlatList
											data={[300, 310, 320, 330]}
											keyExtractor={(e) => e.toString()}
											horizontal={true}
											renderItem={({ item }) => (
												<VideoThumbnai
													imageUri={`https://picsum.photos/${item}`}
													onPress={() =>
														navigation.navigate(
															"Player",
															{
																uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
																title: "Big Buck Bunny",
																back: "Home",
															}
														)
													}
													size={100}
													width={150}
													progress={0.5}
												/>
											)}
											showsHorizontalScrollIndicator={
												false
											}
										/>
									</View>
								}
							/>

							<Section
								title="Trending Today"
								horizontal={true}
								body={
									<View
										style={{
											width: "100%",
										}}
									>
										<FlatList
											data={[300, 310, 320, 330]}
											keyExtractor={(e) => e.toString()}
											horizontal={true}
											showsHorizontalScrollIndicator={
												false
											}
											renderItem={({ item }) => (
												<VideoThumbnai
													imageUri={`https://picsum.photos/${item}`}
													onPress={() =>
														console.log("Meow")
													}
													size={150}
													width={100}
													pressSave={() =>
														console.log("")
													}
												/>
											)}
										/>
									</View>
								}
							/>
							<Section
								title="Genres for you"
								horizontal={true}
								body={
									<View
										style={{
											width: "100%",
											flexWrap: "wrap",
										}}
									>
										<FlatList
											data={[
												"Quick Snack",
												"Horror",
												"Entertainment",
												"Thriller",
												"Comedy",
												"Romance",
												"Psychological Horror",
											]}
											numColumns={3}
											keyExtractor={(e) => e}
											renderItem={({ item }) => (
												<CategoryBtn
													onPress={() =>
														navigation.navigate(
															"Search"
														)
													}
													active={false}
													text={item}
												/>
											)}
										/>
									</View>
								}
							/>

							<Section
								title="Trending near you"
								horizontal={true}
								onPressInfo={() => console.log("")}
								body={
									<View
										style={{
											width: "100%",
										}}
									>
										<FlatList
											data={[600, 610, 620, 630]}
											keyExtractor={(e) => e.toString()}
											listKey="9493239411"
											renderItem={({ item }) => (
												<View
													style={{ marginBottom: 15 }}
												>
													<VideoThumbnai
														imageUri={`https://picsum.photos/${item}`}
														onPress={() =>
															console.log("Meow")
														}
														progress={0.5}
													/>
													<BoldText
														style={{
															fontSize:
																SIZES.font
																	.title,
														}}
													>
														Show Title
													</BoldText>
													<Text numberOfLines={1}>
														Show description lorem
														ipsum dolor ist camen go
													</Text>
												</View>
											)}
											showsVerticalScrollIndicator={false}
										/>
									</View>
								}
							/>
						</>
					}
				/>
			</Screen>
		</>
	);
}

const styles = StyleSheet.create({
	iconBtn: {
		marginLeft: 10,
	},
	search: {
		marginTop: 5,
		marginBottom: 10,
		width: "100%",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#111",
	},
});
