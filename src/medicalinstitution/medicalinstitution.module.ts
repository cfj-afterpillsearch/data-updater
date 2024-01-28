import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service.js';

@Module({
  providers: [ScrapingService],
})
export class MedicalInstitutionModule {}
