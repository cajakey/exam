import { defineStore } from 'pinia';
import api from '@/api/axios';
import alert from '@/utils/alert';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
        total: 0,
        product: null
    }),
    actions: {
        async fetchProducts(page = 1, limit = 10) {
            try {
                const response = await api.get(`/products?page=${page}&limit=${limit}`);
                this.products = response.data.data;
                this.total = response.data.total;
            } catch (error) {
                alert.error('Failed to Load Products', 'Please try again.');
            }
        },

        async fetchProduct(id: number) {
            try {
                const response = await api.get(`/products/${id}`);
                this.product = response.data;
            } catch (error) {
                alert.error('Failed to Load Product', 'Please try again.');
            }
        },

        async createProduct(productData: { name: string; price: number; description: string }) {
            try {
                const response = await api.post('/products', productData);
                this.products.push(response.data);
                alert.success('Product Created', 'The product was successfully added.');
            } catch (error) {
                alert.error('Product Creation Failed', 'Please check the input and try again.');
            }
        },

        async updateProduct(id: number, updatedData: { name?: string; price?: number; description?: string }) {
            try {
                await api.put(`/products/${id}`, updatedData);
                alert.success('Product Updated', 'Changes have been saved.');
                this.fetchProducts();
            } catch (error) {
                alert.error('Update Failed', 'Please try again.');
            }
        },

        async deleteProduct(id: number) {
            try {
                await api.delete(`/products/${id}`);
                this.products = this.products.filter(product => product.id !== id);
                alert.success('Product Deleted', 'The product has been removed.');
            } catch (error) {
                alert.error('Deletion Failed', 'Please try again.');
            }
        }
    }
});
