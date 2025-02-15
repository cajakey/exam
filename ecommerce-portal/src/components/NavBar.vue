<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};
</script>

<template>
    <a-layout-header class="navbar">
        <div class="logo">E-Commerce</div>
        <a-flex gap="small">
            <a-avatar>
                <UserOutlined />
            </a-avatar>
            <a-button
                type="text" style="color: white;" @click="handleLogout"
            >Logout</a-button>
        </a-flex>
    </a-layout-header>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #1677FF;
    color: white;
    padding: 10px 20px;
}

.logo {
    color: white;
    font-size: 18px;
    font-weight: bold;
}
</style>
