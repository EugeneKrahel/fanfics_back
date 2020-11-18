import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) {
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction(): boolean {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getEntitySource(): string {
    return this.isProduction() ? 'dist/**/*.entity.js' : '**/*.entity{.ts,.js}';
  }

  public getMigrationSource(): string {
    return this.isProduction() ? 'dist/**/*.js' : 'src/migration/*.ts';
  }

  public getExtraConfig(): any {
    if (this.isProduction()) {
      return {
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }
    return {};
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      url: this.getValue('DATABASE_URL'),

      entities: [this.getEntitySource()],
      logging: 'all',

      migrationsTableName: 'migration',

      migrations: [this.getMigrationSource()],
      migrationsRun: true,

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
      extra: this.getExtraConfig(),
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'DATABASE_URL',
  ]);

export { configService };
