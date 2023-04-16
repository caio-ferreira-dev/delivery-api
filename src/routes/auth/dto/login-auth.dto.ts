import { IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDTO {
    @ApiProperty({
        description : 'Email',
        example : 'exemplo@exemplo.com.br'
    })
    @IsEmail()
    email : string;

    @ApiProperty({
        description : 'Senha',
        example : 'Password@2023'
    })
    @IsString()
    password: string;
}