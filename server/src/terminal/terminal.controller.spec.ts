import { Test, TestingModule } from '@nestjs/testing';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';

describe('TerminalController', () => {
  let terminalController: TerminalController;
  let terminalService: TerminalService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerminalController],
      providers: [
      {
        provide: TerminalService,
        useValue: {
          findAll: jest.fn(() => [])
        },
      },
    ],
    }).compile();

    terminalController = module.get<TerminalController>(TerminalController);
    terminalService = module.get<TerminalService>(TerminalService);
  });
  describe('findAll', () => {
    it('should be defined', async () => {

      expect(await terminalController.findAll()).not.toEqual;
    });
  })
});
