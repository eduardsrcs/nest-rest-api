import { Controller, Delete, Get, Param, Post, Put, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto) {

  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return 'Remove ' + id
  }
}
