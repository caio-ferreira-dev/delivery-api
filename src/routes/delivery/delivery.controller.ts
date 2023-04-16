import { Controller, Delete, Get, Post, Body, Patch, ParseIntPipe, Param, UseGuards } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateDeliveryDTO } from './dto/create-delivery.dto';
import { SearchDeliveryDTO } from './dto/search-delivery.dto';
import { UpdateDeliveryDTO } from './dto/update-delivery.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Entregas')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createDelivery(@Body() {product, sender, recipient, cep, addressNumber} : CreateDeliveryDTO) {
    return this.deliveryService.createDelivery(product, sender, recipient, cep, addressNumber )
  }

  @Get('search')
  searchDelivery(@Body() {searchColumn, searchKeywords} : SearchDeliveryDTO) {
    return this.deliveryService.searchDeliveryBy(searchColumn, searchKeywords)
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  updateDelivery(@Body() {id, status} : UpdateDeliveryDTO) {
    return this.deliveryService.updateDelivery(id, status)
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  cancelDelivery(@Param('id', ParseIntPipe) id : number) {
    return this.deliveryService.cancelDelivery(id)
  }
}
