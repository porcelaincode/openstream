import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	Image,
	ImageBackground,
	Linking,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import DynamicStatusBar from "./StatusBar";
import { BoldText, Text, View, TextInput } from "./Themed";

export const SIZES = {
	icon: {
		header: 23,
		normal: 20,
		small: 18,
	},
	font: {
		header: 30,
		title: 18,
		text: 16,
		small: 12,
	},
	opacity: {
		active: 0.8,
		thumbnail: 0.5,
	},
};

export const CommonStyles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	container: {
		flex: 1,
		width: "100%",
		paddingHorizontal: "5%",
		alignSelf: "center",
		paddingTop: StatusBar.currentHeight,
	},
	header: {
		width: "100%",
		height: 70,
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	screenTitle: {
		marginVertical: 10,
		maxWidth: "75%",
	},
	title: {
		fontSize: SIZES.font.header,
	},
	// section styles
	section: {
		flexDirection: "column",
		width: "100%",
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "transparent",
	},
	sectionHeaderRow: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sectionHeader: { fontSize: SIZES.font.title, marginBottom: 10 },
	sectionText: { fontSize: SIZES.font.text, marginBottom: 5 },
	// link
	linkContainer: {
		marginVertical: 5,
	},
	linkText: {
		color: "#0084ff",
		textDecorationLine: "underline",
		textDecorationColor: "#555",
	},
	// thumbnail
	thumbnail: {
		borderRadius: 5,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		zIndex: 10,
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 3,
	},
	saveBtn: {
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		position: "absolute",
		top: 0,
		right: 0,
		marginTop: 10,
		marginRight: 10,
	},
	// search
	search: {
		flex: 1,
		marginTop: 5,
		width: "100%",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: SIZES.font.text,
		marginLeft: 10,
	},
});

export function LoadingContainer() {
	const colorScheme = useColorScheme();

	return (
		<View style={CommonStyles.loadingContainer}>
			<ActivityIndicator color={Colors[colorScheme].tint} size="large" />
		</View>
	);
}

interface HeaderProps {
	onBack: any;
	title: string;
}

export function Header(props: HeaderProps) {
	const colorScheme = useColorScheme();

	return (
		<View style={CommonStyles.header}>
			<TouchableOpacity onPress={props.onBack}>
				<AntDesign
					name="back"
					size={SIZES.icon.header}
					color={Colors[colorScheme].text}
				/>
			</TouchableOpacity>

			<View style={CommonStyles.screenTitle}>
				<BoldText numberOfLines={1} style={CommonStyles.title}>
					{props.title}
				</BoldText>
			</View>
		</View>
	);
}

interface ScreenProps {}

export function Screen(props: ScreenProps) {
	return (
		<>
			<DynamicStatusBar />
			<View style={CommonStyles.container} {...props} />
		</>
	);
}

interface SectionProps {
	title: string;
	subtitle?: string;
	body: any;
	horizontal?: boolean;
	onPressInfo?: any;
}

export function Section(props: SectionProps) {
	const colorScheme = useColorScheme();
	return (
		<View style={CommonStyles.section}>
			<View style={CommonStyles.sectionHeaderRow}>
				<BoldText style={CommonStyles.sectionHeader}>
					{props.title}
				</BoldText>
				{props.onPressInfo && (
					<TouchableOpacity onPress={props.onPressInfo}>
						<AntDesign
							name="infocirlceo"
							color={Colors[colorScheme].text}
							size={SIZES.icon.small}
						/>
					</TouchableOpacity>
				)}
			</View>
			{props.subtitle && (
				<Text style={CommonStyles.sectionText}>{props.subtitle}</Text>
			)}
			<View
				style={{ flexDirection: props.horizontal ? "row" : "column" }}
			>
				{props.body}
			</View>
		</View>
	);
}

interface LinkProps {
	uri: string;
	displayText: string;
	retry?: boolean;
}

export function Link(props: LinkProps) {
	async function handleUrl() {
		return Linking.canOpenURL(props.uri)
			.then(() => {
				Linking.openURL(props.uri).catch((err) =>
					Alert.alert(
						`Error Occured`,
						`${err}`,
						[
							{
								text: props.retry ? "Try Again" : "Okay",
								onPress: () => {
									props.retry && handleUrl();
								},
							},
						],
						{
							cancelable: true,
						}
					)
				);
			})
			.catch((err) => console.log(`Error Occured: ${err}`));
	}
	return (
		<TouchableOpacity
			activeOpacity={SIZES.opacity.active}
			onPress={handleUrl}
			style={CommonStyles.linkContainer}
		>
			<Text style={CommonStyles.linkText}>{props.displayText}</Text>
		</TouchableOpacity>
	);
}

interface ButtonProps {
	onPress: any;
	title: string;
	name?: React.ComponentProps<typeof AntDesign>["name"];
	icon?: boolean;
	fullWidth?: boolean;
}

export function Button(props: ButtonProps) {
	const colorScheme = useColorScheme();

	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				padding: 10,
				paddingHorizontal: 15,
				borderRadius: 10,
				width: props.fullWidth ? "100%" : "50%",
				alignSelf: props.fullWidth ? "baseline" : "auto",
				backgroundColor: Colors[colorScheme].inputbg,
			}}
			activeOpacity={SIZES.opacity.active}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: props.icon ? "flex-start" : "center",
					alignItems: "center",
					backgroundColor: "transparent",
				}}
			>
				{props.icon && (
					<AntDesign
						name={props.name}
						color={Colors[colorScheme].tabIconSelected}
						size={SIZES.icon.normal}
						style={{ marginRight: 10 }}
					/>
				)}
				<Text
					style={{
						color: Colors[colorScheme].tabIconSelected,
						fontSize: SIZES.font.text,
					}}
				>
					{props.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

interface VideoThumbnailProps {
	onPress: any;
	imageUri: string;
	saved?: boolean;
	pressSave?: any;
	size?: number;
	width?: number;
	progress?: number;
	disabled?: boolean;
}

export function VideoThumbnai(props: VideoThumbnailProps) {
	const colorScheme = useColorScheme();

	return (
		<View
			style={{
				...CommonStyles.thumbnail,
				height: props.size || 150,
				width: props.width || "100%",
				shadowColor: Colors[colorScheme].tabIconDefault,
				marginRight: props.size ? 10 : 0,
				borderRadius: props.size ? 10 : 0,
				marginBottom: props.size ? 0 : 10,
				overflow: "hidden",
			}}
		>
			<ImageBackground
				source={{ uri: props.imageUri }}
				style={{ flex: 1, zIndex: -11 }}
				resizeMode="cover"
			>
				{props.pressSave && (
					<TouchableOpacity
						onPress={props.pressSave}
						style={{
							backgroundColor: "transparent",
							shadowColor: Colors[colorScheme].background,
							zIndex: 3,
							...CommonStyles.saveBtn,
						}}
						disabled={props.disabled || false}
						activeOpacity={SIZES.opacity.active}
					>
						<AntDesign
							name={props.saved ? "heart" : "hearto"}
							size={SIZES.icon.normal}
							color={
								props.saved
									? Colors[colorScheme].tint
									: Colors[colorScheme].tabIconDefault
							}
						/>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					style={{ flex: 1, zIndex: 2 }}
					onPress={props.onPress}
					disabled={props.disabled || false}
					activeOpacity={SIZES.opacity.thumbnail}
				/>
			</ImageBackground>
			{props.progress && (
				<View
					style={{
						width: props.width,
						height: 3,
						alignItems: "flex-start",
						justifyContent: "flex-start",
						backgroundColor: Colors[colorScheme].tabIconDefault,
					}}
				>
					<View
						style={{
							height: 3,
							width: props.width
								? props.width * props.progress
								: Dimensions.get("window").width *
								  0.9 *
								  props.progress,
							backgroundColor: Colors[colorScheme].tint,
						}}
					/>
				</View>
			)}
		</View>
	);
}

interface SearchInputProps {
	placeholder: string;
	value: any;
	onChange: any;
	onClick?: any;
	autoFocus?: boolean;
}

export function SearchInput(props: SearchInputProps) {
	const colorScheme = useColorScheme();
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				width: "100%",
				alignSelf: "flex-start",
				marginBottom: 10,
				backgroundColor: "transparent",
			}}
		>
			<View
				style={{
					...CommonStyles.search,
					backgroundColor: Colors[colorScheme].inputbg,
				}}
			>
				{props.value.length === 0 && (
					<AntDesign
						name="search1"
						color={Colors[colorScheme].inputtext}
						size={SIZES.icon.normal}
					/>
				)}
				<TextInput
					style={{
						...CommonStyles.searchInput,
						color: Colors[colorScheme].inputtext,
					}}
					value={props.value}
					onChangeText={(text) => {
						props.onChange(text);
					}}
					placeholder={props.placeholder || "search"}
					placeholderTextColor={Colors[colorScheme].inputtext}
					autoFocus={props.autoFocus || false}
					selectionColor={Colors[colorScheme].tint}
				/>
				{props.value.length !== 0 && (
					<TouchableOpacity
						onPress={() => {
							props.onChange("");
						}}
					>
						<Ionicons
							name="close-outline"
							color={Colors[colorScheme].inputtext}
							size={SIZES.icon.normal}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

interface CategoryBtnProps {
	onPress: any;
	active: boolean;
	text: string;
}

export function CategoryBtn(props: CategoryBtnProps) {
	const colorScheme = useColorScheme();

	return (
		<TouchableOpacity
			activeOpacity={SIZES.opacity.active}
			style={{
				borderColor: Colors[colorScheme].tint,
				borderWidth: 0.5,
				borderRadius: 5,
				padding: 5,
				marginRight: 10,
				marginBottom: 10,
				paddingHorizontal: 10,
				backgroundColor: props.active
					? Colors[colorScheme].tint
					: "transparent",
			}}
			onPress={props.onPress}
		>
			<Text
				style={{
					color: props.active
						? Colors[colorScheme].background
						: Colors[colorScheme].tint,
				}}
			>
				{props.text}
			</Text>
		</TouchableOpacity>
	);
}

interface StickerProps {
	uri: string;
}

export default function Sticker(props: StickerProps) {
	const [size, setSize] = useState({
		height: 100,
		width: 200,
	});

	useEffect(() => {
		Image.getSize(props.uri, (width, height) => {
			setSize({
				width: width,
				height: height,
			});
		});
	}, []);

	return (
		<Image
			source={{ uri: props.uri }}
			style={{ height: size.height, width: size.width }}
		/>
	);
}
