import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../components/Common/Elements";
import DynamicStatusBar from "../components/Common/StatusBar";

import { RootStackScreenProps } from "../types";

const SplashScreen = ({ navigation }: RootStackScreenProps<"Splash">) => {
	const { user } = useSelector((state: any) => state.userReducer);

	const checkUser = () => {
		if (user) {
			navigation.navigate("Root");
		} else {
			navigation.navigate("Onboarding");
		}
	};

	useEffect(() => {
		checkUser();
	}, [user]);

	return (
		<>
			<DynamicStatusBar />
			<LoadingContainer />
		</>
	);
};

export default SplashScreen;
