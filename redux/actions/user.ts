// all user
export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export const setUser = (user: any) => (dispatch: any) => {
	dispatch({
		type: SET_USER,
		payload: user,
	});
};

export const removeUser = (user: any) => (dispatch: any) => {
	dispatch({
		type: REMOVE_USER,
		payload: user,
	});
};
