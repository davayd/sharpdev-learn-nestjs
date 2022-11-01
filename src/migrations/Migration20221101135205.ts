import { Migration } from '@mikro-orm/migrations';

export class Migration20221101135205 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" varchar(255) not null, "author_id" varchar(255) not null, constraint "book_pkey" primary key ("id"));');

    this.addSql('alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "task" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "book" cascade;');
  }

}
