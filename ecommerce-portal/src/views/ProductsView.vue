<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';

const productStore = useProductStore();
const { products, total } = storeToRefs(productStore);

const viewType = ref<'table' | 'grid'>('table');
const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Actions', key: 'actions' },
];
const pagination = ref({ current: 1, pageSize: 10 });
const isModalVisible = ref(false);
const newProduct = ref<any>({ name: '', price: 0, description: '' });

const fetchProducts = async (page = 1) => {
    pagination.value.current = page;
    await productStore.fetchProducts(page, pagination.value.pageSize);
};

const editProduct = (product: any) => {
    showCreateModal();
    newProduct.value = { ...product };
};

const deleteProduct = async (id: number) => {
    await productStore.deleteProduct(id);
    fetchProducts(pagination.value.current);
};

const showCreateModal = () => {
    isModalVisible.value = true;
};

const handleSubmit = async () => {
    if (newProduct.value.id) {
        const { id, ...rest } = newProduct.value;
        await productStore.updateProduct(id, rest);
    } else {
        await productStore.createProduct(newProduct.value);
    }
    isModalVisible.value = false;
    newProduct.value = { name: '', price: 0, description: '' };
    fetchProducts(pagination.value.current);
};

onMounted(() => {
    productStore.fetchProducts();
});
</script>

<template>
    <a-flex gap="small" vertical style="padding: 5vh;">
        <a-flex justify="space-between">
            <a-button type="primary" @click="showCreateModal">Create Product</a-button>
            <a-radio-group v-model:value="viewType" button-style="solid">
                <a-radio-button value="table">Table View</a-radio-button>
                <a-radio-button value="grid">Grid View</a-radio-button>
            </a-radio-group>
        </a-flex>
        <a-table v-if="viewType === 'table'" :columns="columns" :data-source="products" row-key="id"
            :pagination="pagination">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actions'">
                    <a-button type="primary" @click="editProduct(record)">Edit</a-button>
                    <a-button type="primary" danger @click="deleteProduct(record.id)"
                        style="margin-left: 8px">Delete</a-button>
                </template>
            </template>
        </a-table>
        <a-row v-else :gutter="[16, 16]">
            <a-col v-for="product in products" :key="product.id" :span="6">
                <a-card :title="product.name">
                    <p>Price: {{ product.price }}</p>
                    <p>{{ product.description }}</p>
                    <a-button type="primary" @click="editProduct(product)">Edit</a-button>
                    <a-button type="primary" danger @click="deleteProduct(product.id)"
                        style="margin-left: 8px">Delete</a-button>
                </a-card>
            </a-col>
        </a-row>
        <a-pagination :total="total" :pageSize="pagination.pageSize" :current="pagination.current"
            @change="fetchProducts" />
        <a-modal v-model:visible="isModalVisible" :title="`${newProduct.id ? 'Edit' : 'Create'} Product`"
            ok-text="Submit" @ok="handleSubmit">
            <a-form layout="vertical">
                <a-form-item label="Name">
                    <a-input v-model:value="newProduct.name" />
                </a-form-item>
                <a-form-item label="Price">
                    <a-input-number v-model:value="newProduct.price" style="width: 100%" />
                </a-form-item>
                <a-form-item label="Description">
                    <a-textarea v-model:value="newProduct.description" />
                </a-form-item>
            </a-form>
        </a-modal>
    </a-flex>
</template>
