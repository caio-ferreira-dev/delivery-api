import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateDeliveryDTO {
    @ApiProperty({
        description : 'Id da entrega a ser atualizada',
        example : 8
    })
    @IsString()
    id : number;

    @ApiProperty({
        description : 'Descrição da situação da entrega',
        example : 'Entrega Concluída'
    })
    @IsString()
    status : string;
}