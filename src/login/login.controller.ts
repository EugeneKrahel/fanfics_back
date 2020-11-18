import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request: any) {
    return this.loginService.login(request.user);
  }


}
