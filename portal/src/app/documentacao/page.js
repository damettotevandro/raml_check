"use client";

import { useState, useRef, useEffect } from 'react';

export default function Documentacao() {
    const [method, setMethod] = useState('');
    const [globalEndpoint, setGlobalEndpoint] = useState('');
    const [apis, setApis] = useState([{ id: 1, name: '' }]);
    const [mermaidSyntax, setMermaidSyntax] = useState('');
    const diagramRef = useRef(null);

    const addApi = () => {
        setApis([...apis, { id: Date.now(), name: '' }]);
    };

    const removeApi = (id) => {
        setApis(apis.filter(api => api.id !== id));
    };

    const updateApiName = (id, name) => {
        setApis(apis.map(api => api.id === id ? { ...api, name } : api));
    };

    const generateDiagram = () => {
        const validApis = apis.filter(api => api.name !== '');
        if (validApis.length === 0) {
            setMermaidSyntax('');
            alert('Selecione pelo menos uma API');
            return;
        }

        const endpoint = globalEndpoint || 'Endpoint Não Nomeado';
        const methodStr = method || 'MÉTODO';
        let syntax = `sequenceDiagram\n`;

        validApis.forEach((api, index) => {
            syntax += `    participant A${index} as ${api.name}\n`;
        });

        if (validApis.length === 1) {
            syntax += `    Note over A0: [${methodStr}] ${endpoint}\n`;
        } else {
            for (let i = 0; i < validApis.length - 1; i++) {
                syntax += `    A${i}->>A${i + 1}: [${methodStr}] ${endpoint}\n`;
            }
            for (let i = validApis.length - 1; i > 0; i--) {
                syntax += `    A${i}-->>A${i - 1}: Retorna Resultado\n`;
            }
        }

        setMermaidSyntax(syntax);
    };

    useEffect(() => {
        if (mermaidSyntax && window.mermaid) {
            window.mermaid.contentLoaded();
        }
    }, [mermaidSyntax]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(mermaidSyntax);
        alert('Copiado!');
    };

    return (
        <main>
            <div className="panel" style={{ padding: '2rem' }}>
                <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Configuração do Endpoint</h2>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Selecione o Método HTTP</label>
                        <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', color: 'var(--text-primary)', border: '1px solid var(--border-color)', outline: 'none' }}>
                            <option value="" disabled>-- Escolha um método --</option>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="PATCH">PATCH</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <div style={{ flex: 2, minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Nome / Descrição do Endpoint</label>
                        <input type="text" value={globalEndpoint} onChange={e => setGlobalEndpoint(e.target.value)} placeholder="Ex: Pedido C Care" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid var(--border-color)', outline: 'none' }} />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>API</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {apis.map((api, index) => (
                            <div key={api.id} style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '0.5rem', position: 'relative' }}>
                                {apis.length > 1 && (
                                    <button onClick={() => removeApi(api.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                                )}
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Nome da API</label>
                                <select value={api.name} onChange={e => updateApiName(api.id, e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid var(--border-color)', outline: 'none' }}>
                                    <option value="" disabled>-- Selecione uma API --</option>
                                    <option value="EAPI DIVERSOS">EAPI DIVERSOS</option>
                                    <option value="EAPI SALESFORCE">EAPI SALESFORCE</option>
                                    <option value="EAPI PROTHEUS">EAPI PROTHEUS</option>
                                    <option value="PAPI TRANSACIONAL">PAPI TRANSACIONAL</option>
                                    <option value="SAPI PROTHEUS">SAPI PROTHEUS</option>
                                    <option value="SAPI SALESFORCE">SAPI SALESFORCE</option>
                                </select>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addApi} className="secondary-btn" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
                        + Adicionar Nova API
                    </button>
                </div>

                <div className="actions" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
                    <button type="button" onClick={generateDiagram} style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: '0.5rem', cursor: 'pointer' }}>
                        Gerar Diagrama da API
                    </button>
                </div>

                {mermaidSyntax && (
                    <div style={{ marginTop: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                            <button onClick={copyToClipboard} style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}>Copiar Mermaid</button>
                        </div>
                        <div className="mermaid" ref={diagramRef}>{mermaidSyntax}</div>
                    </div>
                )}
            </div>
        </main>
    );
}
