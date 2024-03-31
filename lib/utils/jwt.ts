import * as jose from 'jose';

const secret = process.env.NEXTAUTH_SECRET || '06b9ce5826da4a206c10b2621279a40da43411476f2cb1cb2a3a7952d630fab2';

const secretKey = Buffer.from(secret, "hex");

export function verifyJWT(token: string) {
    return jose.jwtVerify(token, secretKey, { algorithms: ["HS256"] });
}


export function signJWT(payload: any) {
    return new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1m")
        .sign(secretKey);
}


export function encryptJWT(payload: any) {
    return new jose.EncryptJWT(payload)
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime("1m")
        .encrypt(secretKey);
}

export function decryptJWT(jwt: string) {
    return jose.jwtDecrypt(jwt, secretKey, { contentEncryptionAlgorithms: ["A256GCM"], keyManagementAlgorithms: ["dir"], });
}
