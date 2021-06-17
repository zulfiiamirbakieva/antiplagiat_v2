import {Controller, Get, Injectable, Post, Request, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {AuthService} from "../auth/auth.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "./users.service";


@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}
}
