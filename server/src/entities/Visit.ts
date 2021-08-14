import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from './Url';

@ObjectType()
@Entity()
export class Visit extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ type: 'date' })
	date!: string;

	@Field()
	@Column('int', { default: 0 })
	count: number;

	@Field()
	@Column()
	urlId: number;

	@ManyToOne(() => Url, (url) => url.visits, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'urlId' })
	url: Url;
}
