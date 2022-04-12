import React from "react";
import { Dimensions, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { LoadingContainer, VideoThumbnai } from "../Common/Elements";
import { View } from "../Common/Themed";

interface ResultListProps {
	loading: boolean;
	data: any;
	onClick: any;
}

const width = (Dimensions.get("window").width * 0.87) / 2;

export default function ResultList(props: ResultListProps) {
	const navigation: any = useNavigation();

	if (props.loading) {
		return <LoadingContainer />;
	}
	return (
		<View style={{ flex: 1, width: "100%" }}>
			<FlatList
				data={[320, 350, 550, 400]}
				keyExtractor={(e) => e.toString()}
				// horizontal={true}
				numColumns={2}
				contentContainerStyle={{ justifyContent: "space-between" }}
				renderItem={({ item }) => (
					<View style={{ marginBottom: "5%" }}>
						<VideoThumbnai
							imageUri={`https://picsum.photos/${item}`}
							onPress={() => props.onClick(item)}
							size={100}
							width={width}
							progress={0.5}
						/>
					</View>
				)}
			/>
		</View>
	);
}
