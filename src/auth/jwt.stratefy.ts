import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./interface/jwt-payload.interface";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecert51',
        })
    }

    async validate(payload: JwtPayload) {
        const {identity} = payload
        const user =  await this.userRepository.findOne({identity});
        if(!user) {
            throw new UnauthorizedException()
        }
        return user;
    };
}