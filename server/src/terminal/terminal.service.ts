import { TerminalDetail } from './entities/terminal-detail.entity';
import { Terminal } from './entities/terminal.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(Terminal)
    private terminalRepository: Repository<Terminal>,
    @InjectRepository(TerminalDetail)
    private terminalDetailRepository: Repository<TerminalDetail>
  ) {}

  findAll() {
    return this.terminalRepository.find({relations:{detail:true}});
  }

  findDetailId(){
    return this.terminalDetailRepository.find({
      relations: {terminal:true},
      where: {
          terminal: {
              terId:'1'
          }
      }
     })
  }
}
