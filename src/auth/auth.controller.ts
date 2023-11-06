import { Controller, Post, Body, UseGuards, Request,Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from "./dto/login-user.dto"
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";
import { ForgotPasswordDto } from './dto/forget-password-user.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { RolesGuard } from './guards/role.guards';
import { Roles } from 'src/prod/decorators/role.decorator';
import { Role } from 'src/prod/enums/role.enum';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    ) {}
  
    
    // sign up
    @UseGuards(RolesGuard)
    @Post('/signup')
    async signup(@Body() signUpUserDto: SignupUserDto) {
    return this.authService.signup(signUpUserDto);
  }

  //login
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @Post('/login')
  async login(@Request() req) {
      return this.authService.login(req.user);
    }
    
    
  // forgetPassword
  @ApiProperty()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/sendingEmail')
  async SendEmail(@Body() reqBody: SendEmailDto): Promise<any> {
    return await this.authService.SendEmail(reqBody);
  }
  
  // forgetPassword with OTP
  @ApiProperty()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) 
  @Put('/forgotPasswordWithOtp')
  async forgotPassword(@Body() reqBody: ForgotPasswordDto ): Promise<any> {
      return await this.authService.forgotPassword(reqBody);
    }
}