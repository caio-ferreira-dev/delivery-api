import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveryService {

  constructor(
    private readonly prismaService : PrismaService
  ) {}

  async createDelivery(product_name, sender_name, recipient_name, cep_id, address_number) {

    const addressData = await axios.get(`https://viacep.com.br/ws/${cep_id}/json/`)
    const data = {
      product_name,
      sender_name,
      recipient_name, 
      delivery_status : "Em trânsito",
      cep_id,
      address_street : addressData.data.logradouro ,
      address_city : addressData.data.localidade ,
      address_number : Number(address_number),
      address_district : addressData.data.uf
    }
    return this.prismaService.delivery.create( {data} )
  }

  async searchDeliveryBy(searchColumn, searchKeywords) {
    return searchColumn == 'id' ? this.prismaService.delivery.findUnique({
      where : { id : Number(searchKeywords) }
    }) : searchColumn == 'sender' ? this.prismaService.delivery.findMany({
      where : { sender_name : searchKeywords }
    }) : searchColumn == 'recipient' ? this.prismaService.delivery.findMany({
      where : { recipient_name : searchKeywords }
    }) : new BadRequestException('Coluna de identificação não encontrada no banco de dados').getResponse()
  }

  async updateDelivery(id, status) {
    const data = {delivery_status : status}
    return this.prismaService.delivery.update({
      data,
      where : { id : Number(id) }
    })
  }

  async cancelDelivery(id : number) {
    await this.prismaService.delivery.delete({
      where : { id }
    })
    return `Entrega de Id "${id}" cancelada com sucesso!`
  }
}
