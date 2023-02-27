
function dec2hex(dec: number) {
  return ("0" + dec.toString(16)).substr(-2);
}

function generateCodeVerifier() {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: ArrayBuffer) {
  var str = "";
  var bytes = new Uint8Array(a);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallengeFromVerifier(v: string) {
  var hashed = await sha256(v);
  var base64encoded = base64urlencode(hashed);
  return base64encoded;
}

function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

interface ChallengeAndVerifierPair { codeChallenge: string, codeVerifier: string }

export const generateChallengeAndVerifier = async (): Promise<ChallengeAndVerifierPair> => {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge =  await generateCodeChallengeFromVerifier(codeVerifier)
  return { codeChallenge, codeVerifier }
}

export const generateStateString = (): string => generateRandomString(16)

