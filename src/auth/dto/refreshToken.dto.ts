import { IsNotEmpty, IsString } from "class-validator";

export default class {
    @IsString()
    @IsNotEmpty()
    token: string
}