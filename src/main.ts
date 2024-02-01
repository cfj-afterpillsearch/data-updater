import { NestFactory } from '@nestjs/core';
import { PharmacyModule as PH } from './pharmacy/pharmacy.module';
import { MedicalInstitutionModule as MI } from './medicalinstitution/medicalinstitution.module';
import { ScrapingService as PH_ScrapingService } from './pharmacy/scraping/scraping.service';
import { ScrapingService as MI_ScrapingService } from './medicalinstitution/scraping/scraping.service';

import * as ff from '@google-cloud/functions-framework';

/**
 * Pub/SubのCloudEventを受け取り、薬局リストのスクレイピングを行うJOBを実行する
 */
ff.cloudEvent('ph_scraping', async (cloudEvent) => {
  // NestJSのアプリケーションを作成
  const app = await NestFactory.createApplicationContext(PH);

  // CloudEventのデータをログに出力
  // console.log('cloudEvent: ', cloudEvent);

  // NestJSのアプリケーションからサービスを取得
  const tasksService = app.get(PH_ScrapingService);

  // サービスのメソッドを実行
  const res = tasksService.execJob(cloudEvent);

  // NestJSのアプリケーションをクローズ
  await app.close();
});

/**
 * Pub/SubのCloudEventを受け取り、医療機関リストのスクレイピングを行うJOBを実行する
 */
ff.cloudEvent('mi_scraping', async (cloudEvent) => {
  // NestJSのアプリケーションを作成
  const app = await NestFactory.createApplicationContext(MI);

  // CloudEventのデータをログに出力
  // console.log('cloudEvent: ', cloudEvent);

  // NestJSのアプリケーションからサービスを取得
  const tasksService = app.get(MI_ScrapingService);

  // サービスのメソッドを実行
  const res = tasksService.execJob(cloudEvent);

  // NestJSのアプリケーションをクローズ
  await app.close();
});
