import request from '../utils/request';

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  code: string;
  phone?: string;
  avatar?: string;
  language?: string;
  roleId?: number;
}

export interface SendCodeDto {
  email: string;
}

// 注册用户
export function registerUser(data: RegisterUserDto) {
  return request.post('/users/register', data);
}

// 发送验证码
export function sendCode(data: SendCodeDto) {
    console.log(data);
  return request.post('/auth/send-code', data);
}


// 用户登录
export function loginUser(data: {
    email: string;
    password: string;
}) {
  return request.post('/auth/login', data);
}

