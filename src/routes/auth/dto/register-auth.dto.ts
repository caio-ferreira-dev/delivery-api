import { IsString, IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterAuthDTO {
    @ApiProperty({
        description : 'Email',
        example : 'exemplo@exemplo.com.br'
    })
    @IsEmail()
    @IsEmail()
    email : string;

    @ApiProperty({
        description : 'Nome de usuário',
        example : 'Anjun user'
    })
    @IsString()
    username : string;

    @ApiProperty({
        description : 'Senha',
        example : 'Password@2023'
    })
    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1
    })
    password: string;
}