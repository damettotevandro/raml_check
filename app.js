document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('json-input');
    const ramlOutput = document.getElementById('raml-output');
    const convertBtn = document.getElementById('convert-btn');

    function autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    // Inicializa os tamanhos
    autoResize(jsonInput);
    autoResize(ramlOutput);

    jsonInput.addEventListener('input', () => autoResize(jsonInput));

    convertBtn.addEventListener('click', () => {
        try {
            const jsonText = jsonInput.value.trim();
            if (!jsonText) {
                ramlOutput.value = "Por favor, insira um JSON válido.";
                return;
            }

            const jsonObj = JSON.parse(jsonText);
            const ramlText = generateRaml(jsonObj);
            ramlOutput.value = ramlText;
            autoResize(ramlOutput); // Redimensiona o output
            
            // Ocultar preview se estiver aberto ao gerar um novo
            document.getElementById('anypoint-preview').classList.add('hidden');
        } catch (error) {
            ramlOutput.value = "Erro ao fazer o parse do JSON:\n" + error.message;
        }
    });

    const validateBtn = document.getElementById('validate-btn');
    validateBtn.addEventListener('click', () => {
        const jsonText = jsonInput.value.trim();
        const statusBadge = document.getElementById('validation-status');
        
        try {
            if (!jsonText) throw new Error("JSON Vazio");
            const jsonObj = JSON.parse(jsonText);
            
            // Simular validação OK
            statusBadge.textContent = "RAML Válido";
            statusBadge.className = "status-badge success";
            
            renderAnypointMock(jsonObj);
            document.getElementById('anypoint-preview').classList.remove('hidden');
            
            // Rolar suavemente para o preview
            document.getElementById('anypoint-preview').scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            statusBadge.textContent = "Erro de Validação";
            statusBadge.className = "status-badge error";
            document.getElementById('anypoint-preview').classList.remove('hidden');
        }
    });
});

function renderAnypointMock(jsonObj) {
    const tbody = document.getElementById('anypoint-tbody');
    tbody.innerHTML = '';
    
    const rows = generateTableRows(jsonObj, 0, '');
    tbody.innerHTML = rows;
}

function generateTableRows(obj, depth, prefix) {
    let html = '';
    const paddingLeft = depth * 20;

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            const type = determineType(value);
            
            html += `
                <tr>
                    <td style="padding-left: ${paddingLeft + 16}px;">
                        <strong>${key}</strong>
                        ${depth === 0 ? '<span class="required-badge" title="Required">*</span>' : ''}
                    </td>
                    <td><span class="type-${type}">${type}</span></td>
                    <td>Yes</td>
                </tr>
            `;

            if (type === 'object') {
                html += generateTableRows(value, depth + 1, key + '.');
            } else if (type === 'array' && value.length > 0) {
                const itemType = determineType(value[0]);
                if (itemType === 'object') {
                    html += generateTableRows(value[0], depth + 1, key + '[].');
                }
            }
        }
    }
    return html;
}

function generateRaml(jsonObj) {
    let raml = "#%RAML 1.0\ntitle: Generated API\nversion: v1\n\ntypes:\n  GeneratedType:\n";
    raml += parseObject(jsonObj, 2);
    return raml;
}

function parseObject(obj, indentLevel) {
    const indent = ' '.repeat(indentLevel * 2);
    let result = `${indent}type: object\n${indent}properties:\n`;

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            const type = determineType(value);
            
            result += `${indent}  ${key}:\n`;

            if (type === 'object') {
                result += parseObject(value, indentLevel + 2);
            } else if (type === 'array') {
                result += parseArray(value, indentLevel + 2);
            } else {
                result += `${indent}    type: ${type}\n`;
            }
        }
    }
    return result;
}

function parseArray(arr, indentLevel) {
    const indent = ' '.repeat(indentLevel * 2);
    let result = `${indent}type: array\n`;

    if (arr.length > 0) {
        const firstItem = arr[0];
        const itemType = determineType(firstItem);

        if (itemType === 'object') {
            result += `${indent}items:\n`;
            result += parseObject(firstItem, indentLevel + 1);
        } else if (itemType === 'array') {
            result += `${indent}items:\n`;
            result += parseArray(firstItem, indentLevel + 1);
        } else {
            result += `${indent}items: ${itemType}\n`;
        }
    } else {
        result += `${indent}items: any\n`;
    }

    return result;
}

function determineType(value) {
    if (value === null) return 'any';
    
    const jsType = typeof value;
    
    if (jsType === 'string') return 'string';
    if (jsType === 'boolean') return 'boolean';
    if (jsType === 'number') {
        return 'string';
    }
    if (Array.isArray(value)) return 'array';
    if (jsType === 'object') return 'object';
    
    return 'any';
}
