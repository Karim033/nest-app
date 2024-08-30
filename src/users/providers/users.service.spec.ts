import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneByEmailProviders } from './find-one-by-email.providers';
import { CreateUserProviders } from './create-user.providers';
import { CreateManyProviders } from './create-many.providers';
import { FindOneByGoogleProvider } from './find-one-by-google.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProviders> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 1,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CreateUserProviders,
          useValue: mockCreateUserProvider,
        },
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: CreateGoogleUserProvider,
          useValue: {},
        },
        {
          provide: FindOneByGoogleProvider,
          useValue: {},
        },
        {
          provide: FindOneByEmailProviders,
          useValue: {},
        },
        {
          provide: CreateManyProviders,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('Should be defined', () => {
      expect(service.createUser).toBeDefined();
    });
    it('Should call createUser on CreateUserProvider', async () => {
      let user = await service.createUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'password@123',
      });
      expect(user.firstName).toEqual('John');
    });
  });
});
