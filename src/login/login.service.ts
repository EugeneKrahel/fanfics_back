import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user: UserDto = await this.usersService.findOne(email);
    if (user && (await this.passwordsAreEqual(user.password, pass)) && (!user.key)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const sign = this.jwtService.sign(payload);
    return {
      accessToken: sign,
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string,): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
