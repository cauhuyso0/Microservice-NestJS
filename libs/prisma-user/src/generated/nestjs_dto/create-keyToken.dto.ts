export class CreateKeyTokenDto {
  userId: number;
  publicKey: string;
  refreshToken: string;
  deletedAt?: Date;
}
