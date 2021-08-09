import { ObjectType, Field } from 'type-graphql';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { Url } from './Url';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryColumn()
	id!: string;

	@BeforeInsert()
	generate() {
		this.id = nanoid(11);
	}

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@OneToMany(() => Url, (url) => url.creator, { cascade: true })
	urls: Url[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
