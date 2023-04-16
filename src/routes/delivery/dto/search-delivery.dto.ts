import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchDeliveryDTO {
    @ApiProperty({
        description : 'Nome da Coluna da tabela do database',
        example : 'id'
    })
    @IsString()
    searchColumn : string;

    @ApiProperty({
        description : 'Conteúdo a ser procurado',
        example : 'Anjun Carapicuiba'
    })
    @IsString()
    searchKeywords : string;
}