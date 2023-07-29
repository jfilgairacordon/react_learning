import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
	User,
	UserId,
	UserWithId,
	addNewUser,
	deleteUserById,
	rollbackUser,
} from "../store/slice";

export const useUserActions = () => {
	const users = useAppSelector((state) => state.users);
	const dispatch = useAppDispatch();

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};
	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};
	const rollbackUserChanges = (user: UserWithId) => {
		dispatch(rollbackUser(user));
	};

	return {
		users,
		removeUser,
		addUser,
		rollbackUserChanges,
	};
};
