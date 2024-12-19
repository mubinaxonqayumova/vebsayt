function processText(action) {
    const method = document.getElementById('method').value;
    const inputText = document.getElementById('inputText').value;
    const key = document.getElementById('key') ? document.getElementById('key').value : '';
    const shift = parseInt(document.getElementById('shift').value); // Sezar Shifri uchun shift

    let result = '';

    if (method === 'caesar') {
        result = action === 'encrypt' ? caesarEncrypt(inputText, shift) : caesarDecrypt(inputText, shift);
    } else if (method === 'base64') {
        result = action === 'encrypt' ? btoa(inputText) : atob(inputText);
    } else if (method === 'vigenere') {
        if (key === '') {
            alert('Kalitni kiriting!');
            return;
        }
        result = action === 'encrypt' ? vigenereEncrypt(inputText, key) : vigenereDecrypt(inputText, key);
    } else if (method === 'xor') {
        if (key === '') {
            alert('Kalitni kiriting!');
            return;
        }
        result = action === 'encrypt' ? xorEncrypt(inputText, key) : xorDecrypt(inputText, key);
    } else if (method === 'rot13') {
        result = rot13(inputText);
    }

    document.getElementById('outputText').value = result;
}

// Sezar Shifri (Caesar Cipher) shifrlash
function caesarEncrypt(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = char.charCodeAt(0) < 91 ? 65 : 97; // Uppercase yoki lowercase
            result += String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
        } else {
            result += char; // Agar harf bo'lmasa, o'zgartirmay qo'yamiz
        }
    }
    return result;
}

// Sezar Shifri (Caesar Cipher) deshifrlash
function caesarDecrypt(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = char.charCodeAt(0) < 91 ? 65 : 97; // Uppercase yoki lowercase
            result += String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
        } else {
            result += char; // Agar harf bo'lmasa, o'zgartirmay qo'yamiz
        }
    }
    return result;
}

// Shifrlash usulini tanlashga qarab, shift inputni ko'rsatish
function toggleShiftInput() {
    const method = document.getElementById('method').value;
    const shiftDiv = document.getElementById('shiftDiv');
    const keyDiv = document.getElementById('keyDiv');
    
    if (method === 'caesar') {
        shiftDiv.style.display = 'block'; // Shift inputni ko'rsatish
        keyDiv.style.display = 'none'; // Kalit inputni yashirish
    } else {
        shiftDiv.style.display = 'none'; // Shift inputni yashirish
        keyDiv.style.display = 'block'; // Kalit inputni ko'rsatish
    }
}
