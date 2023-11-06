import { CanActivate,ExecutionContext,Injectable,BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/prod/decorators/role.decorator';
import { Role } from 'src/prod/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector : Reflector,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    console.log('role', role)
    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user && user.role === role) {
      return true;
    }
    
    return false;
}
}