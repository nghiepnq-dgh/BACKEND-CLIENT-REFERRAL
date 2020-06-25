import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from "src/main/auth/client.entity";
@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'text' })
    contend: string;

    @ManyToOne(type => Client, client => client.customers)
    client: Client;

}