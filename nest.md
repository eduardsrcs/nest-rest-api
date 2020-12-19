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

