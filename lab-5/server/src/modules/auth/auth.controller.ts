import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto, SignUpDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { JwtPayloadUser } from './types';
import { AccessTokenGuard } from './guards';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() data: SingInDto): Promise<any> {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Post('signout')
  signOut(@User() user: JwtPayloadUser) {
    return this.authService.signOut({ id: user.refreshTokenId });
  }
}
