import { Migration } from '@mikro-orm/migrations';

export class Migration20221031143350 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "task" ("id" varchar(255) not null, "description" varchar(255) not null, "title" varchar(255) not null, "status" text check ("status" in (\'OPEN\', \'PROGRESS\', \'DONE\')) not null, constraint "task_pkey" primary key ("id"));',
    );
  }
}
