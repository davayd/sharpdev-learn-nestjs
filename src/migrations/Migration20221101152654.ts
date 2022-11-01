import { Migration } from '@mikro-orm/migrations';

export class Migration20221101152654 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "book" drop constraint "book_author_id_foreign";');

    this.addSql('alter table "book" rename column "author_id" to "task_id";');
    this.addSql('alter table "book" add constraint "book_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "book" drop constraint "book_task_id_foreign";');

    this.addSql('alter table "book" rename column "task_id" to "author_id";');
    this.addSql('alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "task" ("id") on update cascade;');
  }

}
