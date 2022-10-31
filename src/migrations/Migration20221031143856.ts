import { Migration } from '@mikro-orm/migrations';

export class Migration20221031143856 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" add column "test" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop column "test";');
  }

}
