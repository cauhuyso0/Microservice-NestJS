import { Test, TestingModule } from '@nestjs/testing';
import { PrismaOrderService } from './prisma-order.service';

describe('PrismaOrderService', () => {
  let service: PrismaOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaOrderService],
    }).compile();

    service = module.get<PrismaOrderService>(PrismaOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
