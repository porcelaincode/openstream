import * as SecureStore from "expo-secure-store";
import { SET_USER, REMOVE_USER } from "../actions/user";

var userState = {
	user: null,
};

async function save(key: string, value: any) {
	await SecureStore.setItemAsync(key, value);
}

async function remove(key: string) {
	await SecureStore.deleteItemAsync(key);
}

async function getValueFor(key: string) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		return result;
	} else {
		return null;
	}
}

getValueFor("jwtToken").then((data) => {
	// if (data) {
	// 	const decodedToken = jwtDecode(data);
	// 	if (decodedToken.exp * 1000 < Date.now()) {
	// 		remove("jwtToken");
	// 		remove("refreshToken");
	// 	} else {
	// 		userState.user = { ...decodedToken, data };
	// 	}
	// }
});

export function userReducer(state: any = userState, action: any) {
	switch (action.type) {
		case SET_USER:
			save("jwtToken", action.payload.token).then(() => {
				save("refreshToken", action.payload.refreshToken);
			});
			return { ...state, user: action.payload };
		case REMOVE_USER:
			remove("jwtToken").then(() => {
				remove("refreshToken");
			});
			return { ...state, user: {} };
		default:
			return state;
	}
}
