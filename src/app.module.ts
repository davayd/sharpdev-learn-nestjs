import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['../dist/entities'],
      entitiesTs: ['../src/entities'],
      dbName: 'task-management',
      type: 'postgresql',
      baseDir: __dirname,
      host: 'localhost',
      port: 49153,
      user: 'postgres',
      password: 'postgrespw',
      debug: true,
      // autoLoadEntities: true,
      // metadataProvider: TsMorphMetadataProvider
    }),
    TasksModule,
  ],
})
export class AppModule {}
