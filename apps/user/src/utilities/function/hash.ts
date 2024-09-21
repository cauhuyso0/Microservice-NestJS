import * as Bcrypt from 'bcrypt';

export async function hashBySalt(hash: string, roundSalt: number = 10) {
  const salt = await Bcrypt.genSalt(roundSalt);
  return {
    salt,
    hashed: await Bcrypt.hash(hash, salt),
  };
}

export async function compareHash(hash: string, hashed: string) {
  const result = await Bcrypt.compare(hash, hashed);
  return result;
}
