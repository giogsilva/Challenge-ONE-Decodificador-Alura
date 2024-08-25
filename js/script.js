let logoAlura = document.getElementById("logo-alura");
let btnEncrypt = document.getElementById("encrypt");
let btnDecrypt = document.getElementById("decrypt");
let showResultTimeout;

// Encrypt / Decrypt
function getMessage() {
    return document.getElementById("msg-input").value;
}

function encryptAlura(initialMessage) {
    const mappings = {
        'a': 'ai',
        'ã': 'ai',
        'á': 'ai',
        'à': 'ai',
        'e': 'enter',
        'é': 'enter',
        'i': 'imes',
        'í': 'imes',
        'o': 'ober',
        'õ': 'ober',
        'ó': 'ober',
        'u': 'ufat',
        'ú': 'ufat'
    };
    
    return initialMessage.split('').map(char => mappings[char] || char).join('');
}

function decryptAlura(encryptedMessage) {
    const mappings = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };
    
    for (const [key, value] of Object.entries(mappings)) {
        encryptedMessage = encryptedMessage.replaceAll(key, value);
    }
    
    return encryptedMessage;
}

// Show Result and Copy Button
function showResult(outputMsg) {
    let outputSection = document.getElementById("output");

    outputSection.innerHTML = `
    <div class="msg-output fade-in">
        <p id="msgOutput">${outputMsg}</p>
        <button id="copy" class="btn copy">Copiar</button>
    </div>
    `;
    let btnCopy = document.getElementById("copy");
    btnCopy.onclick = copyToClipboard;
}

function copyToClipboard() {
    let msgOutput = document.getElementById("msgOutput").innerText;
    navigator.clipboard.writeText(msgOutput);

    let resultSection = document.getElementById("output");
    let height = resultSection.getElementsByClassName("msg-output")[0].clientHeight;

    resultSection.innerHTML = `
    <div class="msg-copied fade-in" style="min-height: ${height}px">
        <h3>Mensagem copiada</h3>
    </div>
    `;
    showResultTimeout = setTimeout(() => {
        showResult(msgOutput);
    }, 1500);
}

function warnNoMessageFound() {
    let resultSection = document.getElementById("output");

    resultSection.innerHTML = `
    <div class="msgNotFound fade-in">
        <img id="imgMsgNotFound" src="images/no-message-found-blue.svg" alt="Message not Found">
        <h3>Nenhuma mensagem encontrada</h3>
        <p>Digite um texto que você deseja criptografar ou descriptografar.</p>
    </div>
    `;
}

// Implementing Methods for Encryption and Decryption
function encrypt() {
    clearTimeout(showResultTimeout);

    let initialMessage = getMessage();

    if (!initialMessage) {
        warnNoMessageFound();
        return;
    }

    let finalMessage = encryptAlura(initialMessage);
    showResult(finalMessage);
}

function decrypt() {
    clearTimeout(showResultTimeout);
    
    let encryptedMessage = getMessage();

    if (!encryptedMessage) {
        warnNoMessageFound();
        return;
    }

    let isEncrypted = /ai|enter|imes|ober|ufat/.test(encryptedMessage);

    if (!isEncrypted) {
        warnNoMessageFound();
        return;
    }

    let finalMessage = decryptAlura(encryptedMessage);
    showResult(finalMessage);
}

// Change Logo on Click (Add logic if needed)
function changeLogo() {
    // Add logic to change logo here
}

// Apply Methods
logoAlura.onclick = changeLogo;
btnEncrypt.onclick = encrypt;
btnDecrypt.onclick = decrypt;
