import { Controller,  Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import signInDto from './dto/signIn.dto';
import registerDto from './dto/register.dto';
import refreshTokenDto from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  	constructor(private readonly authService: AuthService) {}

 	@Post('signin')
  	signIn(@Body() body: signInDto) {
    	return this.authService.signIn(body);
  	}

  	@Post('register')
  	regster(@Body() body: registerDto) {
    	return this.authService.signUp(body);
  	}
  
  	@Post('refresh')
  	refresh(@Body() body: refreshTokenDto) {
		this.authService.refreshToken(body.token);
  	}
}
