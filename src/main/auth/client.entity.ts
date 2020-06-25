import { Entity, PrimaryGeneratedColumn, Column, Unique,  TreeChildren, TreeParent, Tree } from "typeorm";
import { IsOptional, IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from 'bcrypt';
import { USER_ROLE } from "src/commom/constants";
@Entity()
@Unique(['identity', 'email'])
@Tree("materialized-path")
export class Client  {
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

    @Column()
    role: USER_ROLE;

    @TreeChildren()
    children: Client[];

    @TreeParent()
    parent: Client;

    // @OneToMany(type => Customer, customer => customer.client)
    // customers: Customer[];

    async validdatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}

