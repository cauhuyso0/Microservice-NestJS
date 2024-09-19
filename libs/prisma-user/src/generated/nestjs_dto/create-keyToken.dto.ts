export class CreateKeyTokenDto {
  userId: number;
  publicKey: string;
  deletedAt?: Date;
}
