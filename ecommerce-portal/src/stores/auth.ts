import { defineStore } from 'pinia';
import api from '@/api/axios';
import alert from '@/utils/alert';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null,
    }),
    actions: {
        async register(username: string, password: string) {
            try {
                await api.post('/auth/register', { username, password });
                alert.success('Registration Successful', 'You can now log in.');
            } catch (error) {
                alert.error('Registration Failed', 'Please try again.');
                throw new Error('Registration failed');
            }
        },
        async login(username: string, password: string) {
            try {
                const response = await api.post('/auth/login', { username, password });
                this.token = response.data.access_token;
                localStorage.setItem('token', this.token);
                await this.fetchUser();
                alert.success('Login Successful', 'Welcome back!');
            } catch (error) {
                alert.error('Login Failed', 'Invalid credentials');
                throw new Error('Invalid credentials');
            }
        },
        async fetchUser() {
            if (!this.token) return;
            try {
                const response = await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.user = response.data;
            } catch (error) {
                this.logout();
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
            alert.info('Logged Out', 'You have been logged out.');
        },
    },
});
