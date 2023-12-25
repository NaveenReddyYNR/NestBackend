import { createParamDecorator } from '@nestjs/common';
import { Login } from './login.dto';

export const GetUser = createParamDecorator((data, req): Login => {
  return req.user;
});
