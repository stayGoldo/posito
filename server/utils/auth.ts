// server/utils/auth.ts
import { sha256 } from 'oslo/crypto';
import {  encodeHex } from 'oslo/encoding';

export const hashToken = async (token: string) => {
  const hash = await sha256(new TextEncoder().encode(token));
  return encodeHex(hash);
};