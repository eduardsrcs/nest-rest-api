# Nest

by minin, [video](https://www.youtube.com/watch?v=abdgy72csaA&t=1314s)

[nest docs page](https://docs.nestjs.com)

```sh
npm i -g @nestjs/cli
nest new project-name
```

```sh
nest --help
```

```sh
nest new nest-rest-api
```

select **npm**.

## Files

All starts with `src/main.ts`, this takes *AppModule*....

From `src/app.controller.ts` 

```tsx
return this.appService.getHello();
```

change to 

```typescript
return 'Hello nestjs!'
```

## Nest CLI

Allows generate files.

```sh
nest generate --help
```

## Generate controller

```sh
nest generate controller products
```

```sh
nest g co products
```



CREATE src/products/products.controller.spec.ts (506 bytes)
CREATE src/products/products.controller.ts (105 bytes)
UPDATE src/app.module.ts (338 bytes)

### adding methods

```typescript
@Get()
getAll() {
  return 'getAll'
}

@Get(':id')
getOne(@Param() params) {
  return 'getOne ' + params.id
}
```

but recommended:

```typescript
@Get(':id')
getOne(@Param('id') id:string): string {
  return 'getOne ' + id
}
```

### Post

```typescript
@Post()
create(@Body() body) {

}
```

We must receive request body. Then we insert it in DTO &ndash; data transfer object.

```sh
mkdir src/products/dto
touch src/products/dto/create-product.dto.ts
```

```typescript
export class CreateProductDto {
  readonly title: string
  readonly price: number
}
```

in  `src/products/products.controller.ts`

```
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

```

[time 30:00](https://www.youtube.com/watch?v=abdgy72csaA&t=1800s)

post request will give...

### Put, delete...

```
touch src/products/dto/update-product.dto.ts
```

```typescript
export class UpdateProductDto {
  readonly title: string
  readonly price: number
}
```

[time 32:10](https://www.youtube.com/watch?v=abdgy72csaA&t=1930s)

update `src/products/products.controller.ts`

```typescript
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
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return 'Update ' + id
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return 'Remove ' + id
  }
}

```

### Make redirect

```typescript
@Get()
@Redirect('https://google.com', 301)
getAll(): string {
  return 'getAll'
}
```

this will redirect /products to google.

### Make status code

```typescript
@HttpCode(HttpStatus.CREATED)
```

### Set Headers

```typescript
@Header('Cache-control', 'none')
```

### Manual response

```typescript
@Get()
getAll(@Req() req: Request, @Res() res: Response): string {
  res.status(201).end('Poke')
  return 'getAll'
}
```

Writing logics in controller is not good idea, so, we need to create service.

## Create service

```sh
nest g s products
```

CREATE src/products/products.service.spec.ts (474 bytes)
CREATE src/products/products.service.ts (92 bytes)
UPDATE src/app.module.ts (418 bytes)

This class should be registered as provider in `src/app.module.ts`

```typescript
providers: [AppService, ProductsService],
```

Service makes all the logic of our app.

`src/products/products.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products = []

  getAll() {
    return this.products
  }

  getById(id: string) {
    return this.products.find(p => p.id === id)
  }

  create(productDto: CreateProductDto) {
    this.products.push({
      ...productDto,
      id: Date.now().toString()
    })
  }
}

```

then, inject this service in **ProductsController**:

```typescript
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
```

Now, if we send POST to /products with this data:

```json
{"title": "New title 3", "body": "New body for 3th element"}
```

and then GET to the same link, we'll see that this item is created:

```json
[
    {
        "title": "Put",
        "price": 59,
        "id": "1608394019391"
    }
]
```

## Modules in Nest

```sh
touch src/products/products.module.ts
```

```typescript
import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController]
})

export class ProductsModule {

}
```

From **AppModule** we can remove:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductsController } from './products/products.controller';
// import { ProductsService } from './products/products.service';

@Module({
  imports: [],
  controllers: [AppController/*, ProductsController */],
  providers: [AppService/*, ProductsService*/],
})
export class AppModule {}
```

[time 50:00](https://www.youtube.com/watch?v=abdgy72csaA&t=3000s)

`src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module'

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Connect MongoDB

Will use mongodb cloud. go to [mongodb.com](mongodb.com), select shared cluster.

### Install mongo

[from nest docs](https://docs.nestjs.com/techniques/mongodb)

```sh
npm install --save @nestjs/mongoose mongoose
npm install --save-dev @types/mongoose
```

It is important to include mongo in app.module. Add MongooseModule into imports.

```

```

then connect to cluster, select ip, then connect, choose connect your application, get url and insert it into `app.module.ts` Type **password** and **dbname**

### Creating schemas

```sh
mkdir src/products/schemas
touch src/products/schemas/product.schema.ts
```

```typescript
// import { Schema } from "mongoose";

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
```

Register this schema in `src/products/products.module.ts`:

```typescript
imports: [
  MongooseModule.forFeature([
    {name: Product.name, schema: ProductSchema}
  ])
]
```

in `src/products/products.service.ts`

time 1:08

update `src/products/products.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsModule } from './products.module';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {

  }

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}

```

`src/products/products.controller.ts`

```typescript
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

```

