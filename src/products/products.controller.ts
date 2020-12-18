import { Controller, Delete, Get, Param, Post, Put, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

  @Get()
  getAll(): string {
    return 'getAll'
  }

  @Get(':id')
  getOne(@Param('id') id:string): string {
    return 'getOne ' + id
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): string {
    return `Title: ${createProductDto.title}, price: ${createProductDto.price}`
  }

  @Put()
  update() {

  }

  @Delete()
  remove() {

  }
}
