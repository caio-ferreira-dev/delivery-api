import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateDeliveryDTO {
    @ApiProperty({
        description : 'Nome do produto',
        example : 'nome_do_produto'
    })
    @IsString()
    product : string;

    @ApiProperty({
        description : 'Nome do remetente',
        example : 'Anjun Carapicuiba'
    })
    @IsString()
    sender : string;

    @ApiProperty({
        description : 'Nome do destinatário',
        example : 'Anjun Perus'
    })
    @IsString()
    recipient : string;

    @ApiProperty({
        description : 'Número do CEP (somente números)',
        example : '01234567'
    })
    @IsNumber()
    cep : number;

    @ApiProperty({
        description : 'Número do endereço',
        example : 3000
    })
    @IsNumber()
    addressNumber : number;
}