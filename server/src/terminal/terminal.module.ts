import { TerminalDetail } from './entities/terminal-detail.entity';
import { Terminal } from './entities/terminal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TerminalController } from './terminal.controller';

@Module({
  imports : [TypeOrmModule.forFeature([Terminal, TerminalDetail])],
  controllers: [TerminalController],
  providers: [TerminalService]
})
export class TerminalModule {}
