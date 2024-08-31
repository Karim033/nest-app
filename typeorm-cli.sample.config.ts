import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '46010233',
  database: 'nestjs-blog',
  entities: ['**/*.entity.js'],
  migrations: ['migration/*.js']
});
