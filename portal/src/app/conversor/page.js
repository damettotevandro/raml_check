"use client";

import { useState } from 'react';

export default function Conversor() {
    const [jsonInput, setJsonInput] = useState('');
    const [ramlOutput, setRamlOutput] = useState('');

    const generateRaml = () => {
        if (!jsonInput.trim()) {
            alert('Por favor, cole um JSON válido primeiro.');
            return;
        }

        try {
            const parsedJson = JSON.parse(jsonInput);
            let raml = '#%RAML 1.0 DataType\ntype: object\nproperties:\n';
            
            const processObject = (obj, indentLevel = 1) => {
                const indent = '  '.repeat(indentLevel);
                let result = '';
                
                for (const key in obj) {
                    const value = obj[key];
                    const type = Array.isArray(value) ? 'array' : typeof value;
                    
                    if (type === 'object' && value !== null) {
                        result += `${indent}${key}:\n${indent}  type: object\n${indent}  properties:\n`;
                        result += processObject(value, indentLevel + 2);
                    } else if (type === 'array') {
                        result += `${indent}${key}:\n${indent}  type: array\n${indent}  items:\n`;
                        if (value.length > 0) {
                            const firstItemType = typeof value[0];
                            if (firstItemType === 'object') {
                                result += `${indent}    type: object\n${indent}    properties:\n`;
                                result += processObject(value[0], indentLevel + 3);
                            } else {
                                result += `${indent}    type: ${firstItemType}\n`;
                            }
                        } else {
                            result += `${indent}    type: any\n`;
                        }
                    } else {
                        // Trata tipos primitivos do JSON para os do RAML
                        let ramlType = type;
                        if (type === 'number') {
                            ramlType = Number.isInteger(value) ? 'integer' : 'number';
                        }
                        result += `${indent}${key}:\n${indent}  type: ${ramlType}\n${indent}  required: true\n`;
                    }
                }
                return result;
            };

            raml += processObject(parsedJson);
            setRamlOutput(raml);
        } catch (e) {
            alert('Erro ao fazer o parse do JSON. Verifique se o formato está correto.\n\nDetalhes: ' + e.message);
        }
    };

    const copyRaml = () => {
        if (!ramlOutput) {
            alert('Nenhum RAML gerado para copiar.');
            return;
        }
        navigator.clipboard.writeText(ramlOutput);
        alert('RAML copiado para a área de transferência!');
    };

    const clearFields = () => {
        setJsonInput('');
        setRamlOutput('');
    };

    return (
        <main>
            <div className="panel" style={{ padding: '2rem' }}>
                <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem', textAlign: 'center' }}>Conversor JSON para RAML (Data Type)</h2>

                <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="grid-item">
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Cole o seu Payload JSON aqui</label>
                        <textarea 
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            placeholder="{\n  &quot;exemplo&quot;: &quot;valor&quot;\n}"
                            style={{ width: '100%', minHeight: '400px', padding: '1rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', color: '#10b981', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', fontFamily: "'Consolas', 'Courier New', monospace", fontSize: '0.9rem' }}
                        ></textarea>
                    </div>

                    <div className="grid-item">
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>RAML Data Type Resultante</label>
                        <textarea 
                            value={ramlOutput}
                            readOnly
                            placeholder="#%RAML 1.0 DataType"
                            style={{ width: '100%', minHeight: '400px', padding: '1rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', color: '#c084fc', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', fontFamily: "'Consolas', 'Courier New', monospace", fontSize: '0.9rem' }}
                        ></textarea>
                    </div>
                </div>

                <div className="actions" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button onClick={clearFields} style={{ backgroundColor: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: '0.5rem', cursor: 'pointer' }}>Limpar</button>
                    <button onClick={generateRaml} style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: '0.5rem', cursor: 'pointer' }}>Gerar RAML</button>
                    <button onClick={copyRaml} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: '0.5rem', cursor: 'pointer' }}>Copiar Resultado</button>
                </div>
            </div>
        </main>
    );
}
