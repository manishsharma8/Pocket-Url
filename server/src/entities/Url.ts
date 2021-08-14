import { ObjectType, Field } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Visit } from './Visit';

@ObjectType()
@Entity()
export class Url extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String, { nullable: true })
	@Column({ type: 'text', nullable: true })
	title: string;

	@Field()
	@Column()
	longUrl!: string;

	@Field()
	@Column()
	shortUrl!: string;

	@Field()
	@Column()
	creatorId: string;

	@ManyToOne(() => User, (user) => user.urls, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'creatorId' })
	creator: User;

	@OneToMany(() => Visit, (visit) => visit.url, { cascade: true })
	visits: Visit[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
