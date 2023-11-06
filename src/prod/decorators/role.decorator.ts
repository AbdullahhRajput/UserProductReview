// import {SetMetadata} from '@nestjs/common';
// import { Role } from '../enums/role.enum';

// export const Roles = (...role: Role[]) => SetMetadata('role', role);


import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guards';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );