import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class criaTabelaMessages1685216512510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'messages',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'user_id',
                  type: 'uuid',
                  isNullable: false,
                },
                {
                  name: 'subject',
                  type: 'varchar',
                  length: '100',
                  isNullable: false,
                },
                {
                  name: 'text',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'is_active',
                  type: 'boolean',
                  default: true,
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
        await queryRunner.dropTable('messages');
    }

}
