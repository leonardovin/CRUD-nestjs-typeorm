/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { dataSourceConfig } from './db/data-source';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({...dataSourceConfig, autoLoadEntities: true}), TasksModule],
  providers: [AppService],
  controllers: [AppController],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
