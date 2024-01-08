import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapingService {
  execJob(_cloudEvent): string {
    console.log('source:', _cloudEvent.source);
    return 'Hello World!';
  }
}
