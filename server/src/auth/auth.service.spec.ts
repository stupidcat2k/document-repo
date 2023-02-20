import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalDetail } from '../terminal/entities/terminal-detail.entity';
import { Terminal } from '../terminal/entities/terminal.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, JwtModule, 
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456789',
          database: 'postgres',
          entities: [ User, Terminal, TerminalDetail ],
          synchronize:false,
          logging: true
        })],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(() => [])
          },
        },
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    const mockSuccess = jest.fn();
    const mockFailure = jest.fn();

    const loginSpy = jest.spyOn(service, 'validateUser').mockImplementation((username ,password) => {
      if (username === 'juice' && password === '1') {
        return mockSuccess();
      } else {
        return mockFailure();
      }
    });
    
    service.validateUser('juice', '1');
    expect(mockSuccess).toHaveBeenCalled();
    expect(mockFailure).not.toHaveBeenCalled();
    mockSuccess.mockClear();

    service.validateUser('123', '123');
    expect(mockSuccess).not.toHaveBeenCalled();
    expect(mockFailure).toHaveBeenCalled();
    loginSpy.mockRestore();
  });
});
