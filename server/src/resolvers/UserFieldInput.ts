import { Field, InputType } from 'type-graphql';

@InputType()
export class UserFieldInput {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field()
	password: string;
}
