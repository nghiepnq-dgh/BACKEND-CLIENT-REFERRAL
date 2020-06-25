import { USER_ROLE } from "src/commom/constants";

export interface JwtPayload {
    email: string;
    role: USER_ROLE;
}