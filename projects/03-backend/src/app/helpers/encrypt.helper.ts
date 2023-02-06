import bcrypt from 'bcryptjs';
import { SHA256 } from 'crypto-js';

/**
 * ? Encrypta un string y devuelve el hash
 * @param {string} toEncrypt
 * @returns {*}
 */
export const getEncryptHash = (toEncrypt: string): string => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(toEncrypt, salt);
};

/**
 * ? Recupera la base 64 de un string
 * @param {string} toEncode
 * @returns {string}
 */
export const getBase64 = (toEncode: string): string => {
	return Buffer.from(toEncode).toString('base64');
};

/**
 * ? Recupera string de la conversion a base 64
 * @param {string} toDecode
 * @returns {string}
 */
export const getStringFromBase64 = (toDecode: string): string => {
	return Buffer.from(toDecode, 'base64').toString('ascii');
};


/**
 * ? Recupera un string con el sha256 de un string
 * @param {string} toEncrypt
 * @returns {string}
 */
export const getSha256 = (toEncrypt: string): string => {
	return SHA256(toEncrypt).toString();
};
