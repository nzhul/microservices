import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private _usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return await this._usersRepository.createUser(authCredentials);
  }
}
