import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Provider } from "react-redux";
import { Store } from "./redux/store";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Provider store={Store}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<BottomSheetModalProvider>
							<Navigation colorScheme={colorScheme} />
						</BottomSheetModalProvider>
					</GestureHandlerRootView>
				</Provider>
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}
