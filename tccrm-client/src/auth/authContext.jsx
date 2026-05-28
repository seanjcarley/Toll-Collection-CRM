import React, { createContext, useContext, useMemo, useState } from "react";
import { apiFetch } from "../api/client";
import { setToken as storeToken, clearToken, getToken } from "../api/client";

function decodePayload(token) {
    if (!token) return null;

    try {
        const base64 = token.split('.')[1];
        const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(normalized);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [token, setTokenState] = useState(getToken());
    // console.log(token)
    
    async function login(username, password) {
        // console.log(username, password)
        const data = await apiFetch('/api/auth/login', {
            method: 'POST',
            auth: false,
            body: { username, password },
        });

        storeToken(data.token, data.id);
        setTokenState(data.token);

        return data;
    }

    const value = { token, login, isAuthed: !!token };
    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}