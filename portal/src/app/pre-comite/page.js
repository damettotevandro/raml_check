"use client";

import { useState } from 'react';

export default function PreComite() {
    const [ramlChanged, setRamlChanged] = useState('nao');
    const [archChanged, setArchChanged] = useState('nao');
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.filter(f => f.type.startsWith('image/')).map(f => URL.createObjectURL(f));
        setImages([...images, ...newImages]);
    };

    const formatTextToHTML = (text) => {
        let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        html = html.replace(/"([^"]+)"\s*:\s*("[^"]*"|[0-9]+|true|false|null)/g, function(match) {
            return `<code style="font-family: Consolas, monospace; background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #db2777; font-size: 0.9em; border: 1px solid #e2e8f0;">${match}</code>`;
        });
        html = html.replace(/`([^`]+)`/g, function(match, p1) {
            return `<code style="font-family: Consolas, monospace; background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #db2777; font-size: 0.9em; border: 1px solid #e2e8f0;">${p1}</code>`;
        });
        return html;
    };

    return (
        <main>
            <div className="print-footer" style={{ display: 'none' }}>
                <img src="https://www.clipartmax.com/png/middle/200-2008231_mulesoft-logo-299c-stacked-feedyeti-mulesoft-logo.png" alt="MuleSoft Logo" style={{ height: '45px', opacity: 0.8 }} />
            </div>

            <div className="panel" style={{ padding: '2rem' }}>
                <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>O que validar antes da reunião</h2>

                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '1rem' }}>1. Mexeu no RAML?</strong>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ marginRight: '1rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
                                <input type="radio" name="raml_changed" value="sim" checked={ramlChanged === 'sim'} onChange={() => setRamlChanged('sim')} /> Sim
                            </label>
                            <label style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>
                                <input type="radio" name="raml_changed" value="nao" checked={ramlChanged === 'nao'} onChange={() => setRamlChanged('nao')} /> Não
                            </label>
                        </div>
                        {ramlChanged === 'sim' && (
                            <div style={{ marginTop: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Descreva todas as mudanças realizadas no RAML:</label>
                                <textarea placeholder="Ex: Adicionado novo endpoint /users, alterado tipo de response..." style={{ width: '100%', minHeight: '100px', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', fontFamily: "'Inter', sans-serif" }}></textarea>
                            </div>
                        )}
                    </li>

                    <li style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '1rem' }}>2. Mudou algo na Arquitetura ou Diagrama de Sequência?</strong>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ marginRight: '1rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
                                <input type="radio" name="arch_changed" value="sim" checked={archChanged === 'sim'} onChange={() => setArchChanged('sim')} /> Sim
                            </label>
                            <label style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>
                                <input type="radio" name="arch_changed" value="nao" checked={archChanged === 'nao'} onChange={() => setArchChanged('nao')} /> Não
                            </label>
                        </div>
                        {archChanged === 'sim' && (
                            <div style={{ marginTop: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Descreva as mudanças na Arquitetura:</label>
                                <textarea placeholder="Ex: Adicionado nova chamada para SAPI Salesforce..." style={{ width: '100%', minHeight: '100px', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', fontFamily: "'Inter', sans-serif" }}></textarea>
                            </div>
                        )}
                    </li>

                    <li style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '1rem' }}>3. O que foi desenvolvimento?</strong>
                        <div style={{ marginTop: '0.5rem' }}>
                            <textarea placeholder="Ex: Foi desenvolvida a integração com o Salesforce..." style={{ width: '100%', minHeight: '100px', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', fontFamily: "'Inter', sans-serif" }}></textarea>
                        </div>
                    </li>

                    <li style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '1rem' }}>4. Testes</strong>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Anexe evidências (imagens) da cobertura de testes:</label>
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }} />
                        </div>
                        {images.length > 0 && (
                            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                    {images.map((src, i) => <img key={i} src={src} alt="Evidência" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />)}
                                </div>
                                <button type="button" onClick={() => setImages([])} style={{ display: 'block', margin: '0.5rem auto 0', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}>Remover Imagens</button>
                            </div>
                        )}
                    </li>
                </ul>

                <div className="actions" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
                    <button type="button" className="primary-btn" onClick={() => window.print()} style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: '0.5rem', cursor: 'pointer' }}>
                        Imprimir / Salvar em PDF
                    </button>
                </div>
            </div>
        </main>
    );
}
