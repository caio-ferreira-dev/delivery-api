import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/routes/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private readonly authService : AuthService,
    ) {}

    async canActivate( context : ExecutionContext) {

        const request = context.switchToHttp().getRequest()
        const { authorization } = request.headers

        try {
            await this.authService.verifyToken((authorization ?? '').split(' ')[1])
            return true
        } catch (e) {
            throw new UnauthorizedException('Token não autorizado / não providenciado')
        }
    }
}
