import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(private readonly databaseService: DatabaseService) { }

  @Get('test-db')
  async testDatabaseConnection(): Promise<string> {
    return await this.databaseService.testConnection();
  }
}
