import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) { }

    async create(name: string, price: number, description?: string): Promise<Product> {
        const product = this.productsRepository.create({ name, price, description });
        return this.productsRepository.save(product);
    }

    async findAll(page: number, limit: number): Promise<{ data: Product[]; total: number }> {
        const [data, total] = await this.productsRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        });
        return { data, total };
    }

    async findOne(id: number): Promise<Product | null> {
        return this.productsRepository.findOne({ where: { id } });
    }

    async update(id: number, name: string, price: number, description?: string): Promise<Product | null> {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) return null;

        product.name = name;
        product.price = price;
        product.description = description;

        return this.productsRepository.save(product);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.productsRepository.delete(id);
        return (result.affected || 0) > 0;
    }
}
