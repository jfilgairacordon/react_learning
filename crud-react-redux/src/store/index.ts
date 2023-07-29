import { Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducers, { rollbackUser } from "../users/store/slice";

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const prevState = store.getState();

	next(action);

	if (type === "users/deleteUserById") {
		const userIdToRemove = payload;
		const userToRemove = prevState.users.find(
			(user) => user.id === userIdToRemove,
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) toast.success("User deleted successfully");
				else throw new Error("Failed to delete user");
			})
			.catch((err) => {
				toast.error(`Failed to delete user: ${userIdToRemove}`);
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
				console.error(err);
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReducers,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabase],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
