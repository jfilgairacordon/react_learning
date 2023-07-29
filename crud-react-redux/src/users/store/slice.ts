import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: string;
}

const DEFAULT_STATE: UserWithId[] = [
	{
		id: "1",
		name: "John Doe",
		email: "jonh.doe@mail.com",
		github: "@johndoe",
	},
	{
		id: "2",
		name: "Jane Doe",
		email: "jane.doe@mail.com",
		github: "@janedoe",
	},
	{
		id: "3",
		name: "John Smith",
		email: "jonh.smith@mail.com",
		github: "@johnsmith",
	},
	{
		id: "4",
		name: "Jane Smith",
		email: "jane.smith@mail.com",
		github: "@janesmith",
	},
];

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) return JSON.parse(persistedState).users;
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const newUser = action.payload;
			const id = crypto.randomUUID();
			return [...state, { ...newUser, id: id.toString() }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserDefined = state.some((user) => user.id === action.payload.id);
			if (isUserDefined) return state;
			return [...state, action.payload];
		},
	},
});

export default usersSlice.reducer;
export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
