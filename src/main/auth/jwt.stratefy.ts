import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./interface/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(ClientRepository)
        private clientRepository: ClientRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecert51',
        })
    }

    async validate(payload: JwtPayload) {
        const {identity} = payload
        const user =  await this.clientRepository.findOne({identity});
        if(!user) {
            throw new UnauthorizedException()
        }
        return user;
    };
}