import { Controller, Delete, Get, Param, Post, Put, Body, HttpCode, HttpStatus, Header, Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import {Response, Request} from 'express'
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {

  }

  @Get()
  // @Redirect('https://google.com', 301)
  getAll(): Promise<Product[]> {
    return this.productsService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id:string): Promise<Product> {
    return this.productsService.getById(id)
  }

  @Post()
  // @HttpCode(201)
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    // return `Title: ${createProductDto.title}, price: ${createProductDto.price}`
    return this.productsService.create(createProductDto)
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }
}
