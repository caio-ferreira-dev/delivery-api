import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService : PrismaService,
    private readonly jwtService : JwtService
  ) {}

  createToken(user) {
    return { acessToken : this.jwtService.sign({
      id : user.user_id,
      username : user.username,
      email : user.email
    },{
      audience : 'user',
      expiresIn : '1 day',
      issuer : 'login',
      subject : `${user.user_id}`
    })}
  }

  verifyToken(token) {
    const data = this.jwtService.verify(token, {
      audience : 'user',
      issuer : 'login'
    })

    return data
  }

  async registerUser(username, email, password) {  
    if (await this.prismaService.user.findFirst({where : {email}}) || await this.prismaService.user.findFirst({where : {username}})) {
      throw new BadRequestException('Credencias já cadastradas.')
    }

    await this.prismaService.user.create({
      data : {username, email, password : await bcrypt.hash(password, await bcrypt.genSalt())}
    })

    return {response : "Usuário criado com sucesso!", statusCode : 200}
  }

  async loginUser(email, password) {
  
    const user = await this.prismaService.user.findFirst({
      where : { email }
    })
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Email e/ou senha incorretos.')
    }

    return this.createToken(user)
  }
}
