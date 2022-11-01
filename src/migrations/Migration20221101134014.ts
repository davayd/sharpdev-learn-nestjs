import { Migration } from '@mikro-orm/migrations';

export class Migration20221101134014 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "task_tags" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "task_tags" ("task_id" varchar not null default null, "tag_id" varchar not null default null, constraint "task_tags_pkey" primary key ("task_id", "tag_id"));');
  }

}
