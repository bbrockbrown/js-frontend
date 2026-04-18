// Frontend mock for volunteer access code management.
// When the backend is ready, these functions should call:
//   GET  /api/volunteer-code          (replaces getCurrentCode)
//   POST /api/volunteer-code          (replaces setNewCode)
//   POST /api/volunteer-code/verify   (replaces verifyCode)

const STORAGE_KEY = 'volunteerAccessCode';
const CODE_LENGTH = 8;
// Excludes visually ambiguous characters (0/O, 1/I/L) for easier manual entry.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function randomIndex(max) {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function generateCode() {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i += 1) {
    code += CODE_ALPHABET[randomIndex(CODE_ALPHABET.length)];
  }
  return code;
}

export function getCurrentCode() {
  const value = localStorage.getItem(STORAGE_KEY);
  return value || null;
}

export function setNewCode() {
  const code = generateCode();
  localStorage.setItem(STORAGE_KEY, code);
  return code;
}

export function verifyCode(code) {
  const current = getCurrentCode();
  if (!current) {
    return { success: false, error: 'No active code exists' };
  }
  if (code !== current) {
    return { success: false, error: 'Invalid code' };
  }
  return { success: true };
}
