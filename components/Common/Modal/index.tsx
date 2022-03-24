import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View } from "../Themed";
import { Button } from "react-native";
import { CustomBackdrop, CustomBackground } from "./ModalStyle";

interface ModalProps {
	onClick: any;
	bottomSheetRef: any;
	snapPoints: any;
	handleChange: any;
}

export default function Modal(props: ModalProps) {
	return (
		<BottomSheetModal
			ref={props.bottomSheetRef}
			snapPoints={props.snapPoints}
			onChange={props.handleChange}
			backdropComponent={CustomBackdrop}
			key={9948929391}
		>
			<View style={{ flex: 1 }}>
				<Button
					title="Meow"
					onPress={() => props.bottomSheetRef.current?.close()}
				/>
			</View>
		</BottomSheetModal>
	);
}
