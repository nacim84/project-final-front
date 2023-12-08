import { authConfig } from "@/config/nextauth-config";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";


const NEXT_PUBLIC_AES_SECRET_KEY = process.env.NEXT_PUBLIC_AES_SECRET_KEY || "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getNextAuthSession = async () => {
  const session = await getServerSession(authConfig);
  return session;
}

export const getRequireNextAuthSession = async () => {
  const session = await getNextAuthSession();
  return session;
};

export const convertToDate = (timestampSeconds: number): string => {
  return new Date(timestampSeconds * 1000).toLocaleString();
}

// AES Encryption
export const encryptAES = (dataToCrypt: string) => {
  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(dataToCrypt, NEXT_PUBLIC_AES_SECRET_KEY).toString();
  console.log(ciphertext); // 'my message'
  return ciphertext;
}

export const decryptAES = (dataToDecCrypt: string) => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(dataToDecCrypt, NEXT_PUBLIC_AES_SECRET_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(originalText); // 'my message'
  return originalText;
}


