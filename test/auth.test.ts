import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthService } from '../src/services/auth.service';

describe('Auth Controller', () => {
  let authController : AuthController;
  let authService : AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('New user creation', () => {
    it('should return new user', async () => {
      //const result = ['test'];
      //jest.spyOn(authService, 'joinUp').mockImplementation(() => result);

      expect(await authController.joinUp({
        login: 'testLogin',
        password: 'testPassword'
      })).not.toBeNull();
    });
  });
});
