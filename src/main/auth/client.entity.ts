import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import { IsOptional, IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from 'bcrypt';
import { Customer } from "../customer/customer.entity";
@Entity()
@Unique(['identity', 'email'])
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    name:string;

    @Column()
    password:string;

    @Column()
    @IsOptional()
    address:string;

    @Column()
    identity:string;

    @Column()
    salt: string;

    @OneToMany(type => Customer, customer => customer.client)
    customers: Customer[];

    async validdatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}