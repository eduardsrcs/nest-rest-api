import { Controller, Delete, Get, Param, Post, Put, Body, HttpCode, HttpStatus, Header, Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Response, Request} from 'express'

@Controller('products')
export class ProductsController {

  @Get()
  // @Redirect('https://google.com', 301)
  getAll(): string {
    return 'getAll'
  }

  // @Get()
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poke')
  //   return 'getAll'
  // }


  @Get(':id')
  getOne(@Param('id') id:string): string {
    return 'getOne ' + id
  }

  @Post()
  // @HttpCode(201)
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-control', 'none')
  create(@Body() createProductDto: CreateProductDto): string {
    return `Title: ${createProductDto.title}, price: ${createProductDto.price}`
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
