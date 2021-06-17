import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        user = await this.usersService.findOne(user.email);
        const payload = { email: user.email, sub: user._id, firstName: user.firstName, lastName: user.lastName };
        return {
            user: payload,
            accessToken: this.jwtService.sign(payload),
        };
    }

    async register(_user: any) {
        const user = await this.usersService.create(_user);
        const payload = { email: user.email, sub: user._id, firstName: user.firstName, lastName: user.lastName };
        return {
            user: payload,
            accessToken: this.jwtService.sign(payload),
        };
    }
}
