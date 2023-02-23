type JWT_CONFIG = {
  secret: string;
  expiresIn: string;
};
class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}
  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getJwtAccessConfig(): JWT_CONFIG {
    const accessExp =
      +this.getValue('JWT_ACCESS_LIFETIME_MINUTES') * 60 * 1000;
    return {
      secret: this.getValue('JWT_ACCESS_SECRET'),
      expiresIn: accessExp.toString(),
    };
  }

  public getJwtRefreshConfig(): JWT_CONFIG {
    const refreshExp =
      +this.getValue('JWT_REFRESH_LIFETIME_MINUTES') * 60 * 1000;
    return {
      secret: this.getValue('JWT_REFRESH_SECRET'),
      expiresIn: refreshExp.toString(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'JWT_ACCESS_SECRET',
  'JWT_ACCESS_LIFETIME_MINUTES',
  'JWT_REFRESH_SECRET',
  'JWT_REFRESH_LIFETIME_MINUTES',
]);

export { configService };