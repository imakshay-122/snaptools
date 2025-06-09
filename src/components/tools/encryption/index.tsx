import React from 'react';
import { EncryptionToolComponentMap } from '@/types/encryption';
import AESTool from './AESTool';
import Base64Tool from './Base64Tool';
import BlowfishTool from './BlowfishTool';
import CAST5Tool from './CAST5Tool';
import DESTool from './DESTool';
import TripleDESTool from './TripleDESTool';
import RSATool from './RSATool';
import EncodingTool from './EncodingTool';
import HTMLEncodeTool from './HTMLEncodeTool';
import MD5Tool from './MD5Tool';
import MD4Tool from './MD4Tool';
import MD2Tool from './MD2Tool';
import MDC2Tool from './MDC2Tool';
import MCDTool from './MCDTool';
import RIPEMD160Tool from './RIPEMD160Tool';
import SHATool from './SHATool';
import SHA3Tool from './SHA3Tool';
import URLEncodeTool from './URLEncoderTool';
import BCryptTool from './BCryptTool';
import SCryptTool from './SCryptTool';
import PBKDF2Tool from './PBKDF2Tool';

const encryptionTools: EncryptionToolComponentMap = {
  'aes': AESTool,
  'base64': Base64Tool,
  'blowfish': BlowfishTool,
  'cast5': CAST5Tool,
  'des': DESTool,
  '3des': TripleDESTool,
  'rsa': RSATool,
  'encoding': EncodingTool,
  'html': HTMLEncodeTool,
  'md5': MD5Tool,
  'md4': MD4Tool,
  'md2': MD2Tool, // 'md2': 'MD2'
  'mdc2': MDC2Tool, //'mdc2': 'MDC2'
  'mcd': MCDTool, //'mcd': 'MCD'
  'ripemd160': RIPEMD160Tool,
  'sha': SHATool,
  'sha3': SHA3Tool,
  'url': URLEncodeTool,
  'bcrypt': BCryptTool,
  'scrypt': SCryptTool,

  'pbkdf2': PBKDF2Tool
};



export default encryptionTools;