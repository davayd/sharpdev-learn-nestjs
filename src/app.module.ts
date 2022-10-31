import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [MikroOrmModule.forRoot(), TasksModule],
})
export class AppModule {}
