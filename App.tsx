import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Provider } from "react-redux";
import { Store } from "./redux/store";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Provider store={Store}>
					<BottomSheetModalProvider>
						<Navigation colorScheme={colorScheme} />
					</BottomSheetModalProvider>
				</Provider>
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}
