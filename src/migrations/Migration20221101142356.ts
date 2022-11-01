import { Migration } from '@mikro-orm/migrations';

export class Migration20221101142356 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "task_tags" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "task_tags" ("task_id" varchar(255) not null, "tag_id" varchar(255) not null, constraint "task_tags_pkey" primary key ("task_id", "tag_id"));');

    this.addSql('alter table "task_tags" add constraint "task_tags_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "task_tags" add constraint "task_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
