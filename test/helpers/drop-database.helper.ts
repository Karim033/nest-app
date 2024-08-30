import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // create the connection with datasource
  const appDataSource = await new DataSource({
    type: 'postgres',
    synchronize: config.get('database.synchronize'),
    host: config.get('database.host'),
    port: config.get('database.port'),
    username: config.get('database.user'),
    password: config.get('database.password'),
    database: config.get('database.name'),
  }).initialize();
  // drop all tables
  await appDataSource.dropDatabase();
  // close the connections
  await appDataSource.destroy();
}
