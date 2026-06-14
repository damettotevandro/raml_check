"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const sessionData = localStorage.getItem('currentUser');
        if (!sessionData && pathname !== '/') {
            router.push('/');
        } else if (sessionData) {
            setUser(JSON.parse(sessionData));
            if (pathname === '/') {
                router.push('/conversor'); // Redireciona se estiver logado na home
            }
        }
    }, [pathname, router]);

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        router.push('/');
    };

    if (pathname === '/') {
        return null; // Não exibe menu na tela de login
    }

    return (
        <header>
            <nav className="top-nav">
                <Link href="/conversor" className={pathname === '/conversor' ? 'active' : ''}>Conversor & Validador</Link>
                <Link href="/documentacao" className={pathname === '/documentacao' ? 'active' : ''}>Documentação</Link>
                <Link href="/pre-comite" className={pathname === '/pre-comite' ? 'active' : ''}>Pré-Comitê PROD</Link>
                <div className="user-profile" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span id="user-greeting" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
                        Olá, {user?.name}
                    </span>
                    <button onClick={logout} style={{ background: 'none', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#ef4444', padding: '0.4rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', transition: 'all 0.2s' }}>
                        Sair
                    </button>
                </div>
            </nav>
        </header>
    );
}
