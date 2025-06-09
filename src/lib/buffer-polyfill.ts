/**
 * A browser-compatible Buffer polyfill utility for encryption tools
 */

export class BufferPolyfill {
  private static instance: BufferPolyfill;
  private constructor() {}

  public static getInstance(): BufferPolyfill {
    if (!BufferPolyfill.instance) {
      BufferPolyfill.instance = new BufferPolyfill();
    }
    return BufferPolyfill.instance;
  }

  public static from(data: string | ArrayBuffer | Uint8Array): Uint8Array {
    if (typeof data === 'string') {
      return new TextEncoder().encode(data);
    } else if (data instanceof ArrayBuffer) {
      return new Uint8Array(data);
    } else if (data instanceof Uint8Array) {
      return data;
    }
    throw new Error('Unsupported data type for buffer conversion');
  }

  public static toString(buffer: Uint8Array, encoding: 'base64' | 'hex' = 'base64'): string {
    if (encoding === 'base64') {
      return btoa(String.fromCharCode.apply(null, Array.from(buffer)));
    } else if (encoding === 'hex') {
      return Array.from(buffer)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    throw new Error('Unsupported encoding type');
  }

  public static fromString(str: string, encoding: 'base64' | 'hex' = 'base64'): Uint8Array {
    if (encoding === 'base64') {
      const binaryStr = atob(str);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      return bytes;
    } else if (encoding === 'hex') {
      const bytes = new Uint8Array(str.length / 2);
      for (let i = 0; i < str.length; i += 2) {
        bytes[i / 2] = parseInt(str.substr(i, 2), 16);
      }
      return bytes;
    }
    throw new Error('Unsupported encoding type');
  }
}