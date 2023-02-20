import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Get('findAll')
  findAll() {
    return this.terminalService.findAll();
  }
}
