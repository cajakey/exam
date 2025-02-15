<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const authStore = useAuthStore();
const router = useRouter();
const formState = ref({ username: '', password: '' });
const loading = ref(false);

const handleRegister = async () => {
    if (!formState.value.username || !formState.value.password) {
        message.error('Username and password are required.');
        return;
    }

    loading.value = true;
    try {
        await authStore.register(formState.value.username, formState.value.password);
        router.push('/');
    } catch (error) {
        console.log('error', error);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="auth-container">
        <a-card title="Register" class="auth-card">
            <a-form @submit.prevent="handleRegister">
                <a-form-item>
                    <a-input v-model:value="formState.username" placeholder="Username" />
                </a-form-item>
                <a-form-item>
                    <a-input-password v-model:value="formState.password" placeholder="Password" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="loading" block>Register</a-button>
                </a-form-item>
                <a-form-item>
                    Already have an account? <router-link to="/">Login</router-link>
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
