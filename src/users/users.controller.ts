import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService) {}
    
    /*
        GET /users
        GET /users:id
        POST /users
        PATH /users:id
        DELETE /users:id
    */

    @Get() //GET for users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role);
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }
    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto ) {

        return this.userService.create(user)
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto ) {
        return this.userService.update(id, userUpdate)
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}

