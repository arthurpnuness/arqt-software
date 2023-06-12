import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class criaTabelaUsers1685212620260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '100',
                  isNullable: false,
                },
                {
                  name: 'email',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'password',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'avatar',
                  type: 'varchar',
                  length: '255',
                  isNullable: true,
                },
                {
                  name: 'role',
                  type: 'varchar',
                  length: '10',
                  default: "'user'",
                  isNullable: false
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                  onUpdate: 'now()',
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
