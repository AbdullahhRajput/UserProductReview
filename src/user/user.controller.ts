    import { Controller, Get, Post  ,Body,  Patch, Param, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
    import { UserService } from './user.service';
    import { User } from './schema/user.schema';
    import { createUserDto } from './dto/create-user.dto';
    import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
    import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from 'mongoose';

    @ApiTags("User")
    @Controller('users')
    export class UserController {
    constructor(private userService: UserService) {}
    
    // create data
    @Post('/createUser')
    async creatUser(@Body() reqBody:createUserDto): Promise<User>{
        return this.userService.create(reqBody);
    }

    
    // get All
    @Get('/getAllUsers')
    async getAllData(): Promise<User[]>{
        return this.userService.findAll();
    }

    
    // update data
    @Patch('/:id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: String, description: 'User ID' }) 
    @ApiBody({ type: UpdateUserDto })
    async updateUser(@Param('id') userId: string, @Body() updateUserDto: Partial<User>){
    const updatedUser = await this.userService.updateUserById(userId, updateUserDto);
    if (!updatedUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return updatedUser;
    }
    
   // delete data
    @Delete('/deleteUser/:id')
    async deleteUser (@Param ('id') id: string): Promise<User>{
        const deleteUser = await this.userService.deletebyId(id);
        return deleteUser
    }


    // Get All Products of One User
    @Get(':userId/add-all-products')
    async addAllProducts(@Param('userId') userId: string) {
        try {
        const user = await this.userService.addAllProductsToUser(userId);
        return user;
        } catch (error) {
        if (error instanceof NotFoundException) {
            throw new InternalServerErrorException('Error adding all products');
        }
        }
    }
}