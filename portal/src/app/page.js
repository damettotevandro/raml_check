"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { localDatabase } from '@/lib/db';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = localDatabase.users.find(u => u.username === username.trim() && u.password === password);
        if (user) {
            setError(false);
            localStorage.setItem('currentUser', JSON.stringify({ username: user.username, name: user.name }));
            router.push('/conversor');
        } else {
            setError(true);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="login-container" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', backgroundColor: 'var(--panel-bg)', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Portal de APIs
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>Faça login para acessar o sistema</p>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem' }}>
                            Usuário ou senha incorretos.
                        </div>
                    )}

                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Usuário</label>
                        <input type="text" id="username" placeholder="Digite seu usuário" required value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Senha</label>
                        <input type="password" id="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    
                    <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem' }}>Entrar</button>
                </form>

                <img src="https://www.clipartmax.com/png/middle/200-2008231_mulesoft-logo-299c-stacked-feedyeti-mulesoft-logo.png" alt="MuleSoft Logo" style={{ marginTop: '2rem', height: '35px', opacity: 0.5, marginInline: 'auto' }} />
            </div>
        </div>
    );
}
