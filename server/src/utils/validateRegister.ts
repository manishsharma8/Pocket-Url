import { UserFieldInput } from 'src/resolvers/UserFieldInput';

export const validateRegister = (options: UserFieldInput) => {
	if (options.username.length < 2) {
		return [
			{
				field: 'username',
				message: 'Username length must be at least 3 characters',
			},
		];
	}
	if (options.username.includes('@')) {
		return [
			{
				field: 'username',
				message: 'Username cannot consist an @',
			},
		];
	}
	if (!options.email.includes('@')) {
		return [
			{
				field: 'email',
				message: 'Please enter a valid Email Address',
			},
		];
	}
	if (options.password.length < 2) {
		return [
			{
				field: 'password',
				message: 'Password length must be at least 3 characters',
			},
		];
	}
	return null;
};
