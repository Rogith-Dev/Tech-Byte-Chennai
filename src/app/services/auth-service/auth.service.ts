import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUserRole(): string | null {
        const token = this.getToken();
        if (!token) return null;

        const decoded: any = jwtDecode(token);
        return decoded.role;
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;

        const decoded: any = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
    }

    logout() {
        localStorage.clear();
        window.location.href = '/login';
    }
}
