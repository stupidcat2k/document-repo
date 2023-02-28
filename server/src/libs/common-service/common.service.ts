import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

export class CommonService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async createSeqNo(module: string) {
    const fc_get_seqno = await this.connection.query(
      `SELECT fc_get_seqno('${module}')`,
    );
    return fc_get_seqno[0].fc_get_seqno.toString();
  }
}
