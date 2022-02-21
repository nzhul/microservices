import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private _usersRepository: UsersRepository,
    private _jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return await this._usersRepository.createUser(authCredentials);
  }

  async signIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentials;
    const dbuser = await this._usersRepository.findOne({ username });

    if (dbuser && (await bcrypt.compare(password, dbuser.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this._jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials!');
    }
  }
}
