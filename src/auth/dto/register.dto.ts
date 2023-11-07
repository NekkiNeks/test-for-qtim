import { IsNotEmpty, IsString } from 'class-validator'

export default class {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string
}