<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const authStore = useAuthStore();
const router = useRouter();
const formState = ref({ username: '', password: '' });
const loading = ref(false);

const handleLogin = async () => {
    if (!formState.value.username || !formState.value.password) {
        message.error('Username and password are required.');
        return;
    }

    loading.value = true;
    try {
        await authStore.login(formState.value.username, formState.value.password);
        router.push('/products');
    } catch (error) {
        console.log('error', error);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="auth-container">
        <a-card title="Login" class="auth-card">
            <a-form @submit.prevent="handleLogin">
                <a-form-item>
                    <a-input v-model:value="formState.username" placeholder="Username" />
                </a-form-item>
                <a-form-item>
                    <a-input-password v-model:value="formState.password" placeholder="Password" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="loading" block>Login</a-button>
                </a-form-item>
                <a-form-item>
                    Don't have an account? <router-link to="/register">Register</router-link>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<style scoped>
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f0f2f5;
}

.auth-card {
    width: 350px;
}
</style>
