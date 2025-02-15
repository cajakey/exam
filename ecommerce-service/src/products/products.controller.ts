import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async create(@Body() body: { name: string; price: number; description?: string }) {
        return this.productsService.create(body.name, body.price, body.description);
    }

    @Get()
    async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
        return this.productsService.findAll(Number(page), Number(limit));
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: { name: string; price: number; description?: string },
    ) {
        return this.productsService.update(id, body.name, body.price, body.description);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productsService.delete(id);
    }
}
