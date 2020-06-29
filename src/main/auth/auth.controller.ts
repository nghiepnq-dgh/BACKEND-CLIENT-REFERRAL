import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorator/get-user.decorator';
import { Client } from './client.entity';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SSODto } from './dto/sso.dto';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '[API] Register - Customer đăng kí',
  })
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    const result = await this.authService.signUp(authCredentialsDto);
    return { success: true, result };
  }

  @ApiOperation({
    summary: '[API] Seed admin - Gọi lần đầu tiên khi chạy',
  })
  @Post('/seed_user')
  async seedUser() {
    const result = await this.authService.seedUserServicer();
    return { success: true, result };
  }

  @ApiOperation({
    summary: '[API] Login - Dang nhap',
  })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
  ): Promise<{ acccessToken: string }> {
    return this.authService.signIn(authLoginDto);
  }

  @ApiOperation({
    summary: '[API] Login SSO - Dang nhap sso referral',
  })
  @Post('/login-to-referral')
  async loginSSO(
    @Body() data: SSODto,
    ){
    const result = await this.authService.ssoService(data);
    return { url: result?.url };
  }

  @ApiOperation({
    summary: '[API] Get info - Lấy thông tin cá nhân',
  })
  @Post('/me')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  test(@GetUser() client: Client) {
    return client;
  }
}
