import { UserEntity } from './user.entity';
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 100, nullable: false })
	subject!: string;

	@Column({ nullable: false})
	text!: string;

	@Column({ type: 'boolean', nullable: false, default: true})
	is_active: boolean = true;

    @Column({ nullable: false })
    user_id!: string;
    
    @ManyToOne(() => UserEntity, (user) => user.messages)
    @JoinColumn({ name: 'user_id' })
	user!: UserEntity;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;


    @BeforeInsert()
    setCreatedAt() {
        this.created_at = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updated_at = new Date();
    }
}
