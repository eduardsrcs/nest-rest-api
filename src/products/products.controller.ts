import { Controller, Delete, Get, Param, Post, Put, Body, HttpCode, HttpStatus, Header, Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import {Response, Request} from 'express'
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {

  }

  @Get()
  // @Redirect('https://google.com', 301)
  getAll() {
    return this.productsService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id:string) {
    return this.productsService.getById(id)
  }

  @Post()
  // @HttpCode(201)
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-control', 'none')
  create(@Body() createProductDto: CreateProductDto) {
    // return `Title: ${createProductDto.title}, price: ${createProductDto.price}`
    return this.productsService.create(createProductDto)
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return 'Update ' + id
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return 'Remove ' + id
  }
}
