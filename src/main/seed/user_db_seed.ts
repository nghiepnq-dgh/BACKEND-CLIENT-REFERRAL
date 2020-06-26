import { USER_ROLE } from "src/commom/constants";

export const userDb = [
    {
        name: "client",
        email: "client@gmail.com",
        password: "12345678",
        address: 'This is my address',
        identity: '134343432',
        role: USER_ROLE.CLIENT,
        inviterId: '',
    },
]