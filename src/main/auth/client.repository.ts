import { Repository, EntityRepository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Client } from './client.entity';
import { USER_ROLE } from 'src/commom/constants';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  //TODO HASH PASSWORD TO SAVE DATA
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findUserRepository(email: string) {
    const result = await this.findOne({ email });
    return result;
  }

  async validateUserPassword(authLoginDto: AuthLoginDto): Promise<{}> {
    const { email, password } = authLoginDto;
    const findUSer = await this.findOne({ email });
    if (!findUSer) {
      throw new BadRequestException(
        'Ngươi dùng không tôn tại. Vui lòng đăng kí trước',
      );
    } else if (await findUSer.validdatePassword(password)) {
      return { email: findUSer.email, role: findUSer.role };
    } else {
      throw new BadRequestException('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  }

  //TODO REGISTER USER
  async singUp(authCredentialsDto: AuthCredentialsDto) {
    const {
      name,
      password,
      address,
      identity,
      email,
      role,
    } = authCredentialsDto;

    //Check duplicate indentity
    const exitsCmnd = await this.findOne({ identity });
    if (exitsCmnd) {
      throw new BadRequestException('Chứng minh nhân dân không được trùng');
    }

    const exitsEmail = await this.findOne({ email });
    if (exitsEmail) {
      throw new BadRequestException('Email không được trùng');
    }

    if (role === USER_ROLE.CLIENT) {
        const admin = await this.findOne({ role: USER_ROLE.CLIENT });
        console.log("DEBUG_CODE: singUp -> admin", admin);
        if (admin) throw new BadRequestException('CANNOT CREATE ADMIN');
        const salt = await bcrypt.genSalt();
        const user = new Client();
        user.name = name;
        user.password = await this.hashPassword(password, salt);
        user.address = address;
        user.identity = identity;
        user.salt = salt;
        user.email = email;
        user.role = role;
        const result = await this.save(user);
        return result;
    } else {
    const salt = await bcrypt.genSalt();
    const user = new Client();
    user.name = name;
    user.password = await this.hashPassword(password, salt);
    user.address = address;
    user.identity = identity;
    user.salt = salt;
    user.email = email;
    user.role = role;
    
    console.log("DEBUG_CODE: singUp -> user", user);
    const result = await this.save(user);
    return result;
    }
  }
}
