import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EVENT_LOG } from '@lib/ecommerce-utilities';

@Controller()
export class LogController {
  constructor() {}

  @MessagePattern(EVENT_LOG.DEBUG)
  debug(@Payload() message: any): any {
    console.log('object');
    console.log('object :', message);
    console.log('object');
    console.log('object');
    console.log('object');
    console.log('object');
    console.log('object');
    console.log('object');
    const dragonId = message.dragonId;
    console.log(dragonId);
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];
    return items;
  }

  @MessagePattern(EVENT_LOG.ERROR)
  error(@Payload() message: any): any {
    const dragonId = message.dragonId;
    console.log(dragonId);
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];
    return items;
  }

  @MessagePattern(EVENT_LOG.FATAL)
  fatal(@Payload() message: any): any {
    const dragonId = message.dragonId;
    console.log(dragonId);
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];
    return items;
  }

  @MessagePattern(EVENT_LOG.LOG)
  log(@Payload() message: any): any {
    const dragonId = message.dragonId;
    console.log(dragonId);
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];
    return items;
  }

  @MessagePattern(EVENT_LOG.VERBOSE)
  verbose(@Payload() message: any): any {
    const dragonId = message.dragonId;
    console.log(dragonId);
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];
    return items;
  }

  @MessagePattern(EVENT_LOG.WARN)
  warn(@Payload() message: any): any {
    const dragonId = message.dragonId;
    console.log(dragonId);
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];
    return items;
  }
}
