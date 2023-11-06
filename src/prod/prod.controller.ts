import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ProdService } from './prod.service';
import { CreateProdDto } from './dto/create-prod.dto';
import { Prod } from './schema/prod.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { updateProdDto } from './dto/update.prod';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { Roles } from './decorators/role.decorator';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpCode } from '@nestjs/common';

@ApiTags("Prod")
@Controller('prod')
export class ProdController {
    constructor(private readonly prodService: ProdService,
    ) {}

    // @HttpCode(HttpStatus.OK)
    @Post('/createProd')
    @ApiBearerAuth()
    @Roles(Role.User)
    async createProd(@Body() reqBody:CreateProdDto,request:any): Promise<Prod>{
      console.log(request)
      return
        return this.prodService.createProd(reqBody);
    }


  // get All
    @Get('/getAllProds')
    async findAll(): Promise<Prod[]>{
        return this.prodService.findAll();
    }

     // get by Object ID
    @Get('/:id')
    async findById( @Param ('id') id: string ): Promise<Prod>{
    return await this.prodService.findById(id);

    }

     // Update by Object ID
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() updateData: updateProdDto) {
    const updatedUser = await this.prodService.updateUserById(id,updateData);
    console.log(updatedUser);
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    }

   // delete data
  @Delete('/deleteUser/:id')
  async deletebyId (@Param ('id') id: string): Promise<Prod>{
    return await this.prodService.deletebyId(id);
    }
}
