import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import constants from '../../constants'
import signInDto from './dto/signIn.dto';
import registerDto from './dto/register.dto';

interface createAccessTokenParams {
    id: string,
    username: string
}

interface createRefreshTokenParams {
    id: string,
    username: string
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    signIn(dto: signInDto) {
        const user = this.usersService.findOneByUsername(dto.username);
        const validPassword = user.checkPassword(dto.password);
        if (!validPassword) throw new UnauthorizedException('Неверный пароль');

        const tokenPayload = {id: user.id, username: user.username};
        const accessToken = this.createAccessToken(tokenPayload);
        const refreshToken = this.createRefreshToken(tokenPayload);

        return {accessToken, refreshToken};
    }

    signUp(dto: registerDto) {
        const user = this.usersService.create(dto);
        
        const tokenPayload = {id: user.id, username: user.username};
        const accessToken = this.createAccessToken(tokenPayload);
        const refreshToken = this.createRefreshToken(tokenPayload);
        
        this.usersService.update(user.id, {refreshToken});
        
        return {accessToken, refreshToken};
    }

    refreshToken(refreshToken: string) {
        const payloadFromToken = this.jwtService.verify(refreshToken, {secret: constants.refreshToken.secret});

        const user = this.usersService.findOneById(payloadFromToken.id);
        if (!user.refreshToken || user.refreshToken !== refreshToken) throw new UnauthorizedException("Токены не совпадают");

        const tokenPayload = {id: user.id, username: user.username};
        const accessToken = this.createAccessToken(tokenPayload);
        const newRefreshToken = this.createRefreshToken(tokenPayload);

        this.usersService.update(user.id, {refreshToken: newRefreshToken});

        return {accessToken, refreshToken: newRefreshToken};
    }

    createAccessToken(payload: createAccessTokenParams) {
        return this.jwtService.sign(payload, {expiresIn: constants.accessToken.expires, secret: constants.accessToken.secret})
    }

    createRefreshToken(payload: createRefreshTokenParams) {
        return this.jwtService.sign(payload, {expiresIn:constants.refreshToken.expires, secret: constants.refreshToken.secret})
    }
}
