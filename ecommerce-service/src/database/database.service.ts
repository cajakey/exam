import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  async testConnection(): Promise<string> {
    try {
      // Check if the connection is already initialized
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      return 'Database connection successful!';
    } catch (error) {
      console.error('Database connection failed:', error);
      return `Database connection failed: ${error.message}`;
    }
  }
}
