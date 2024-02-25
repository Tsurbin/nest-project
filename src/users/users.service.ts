import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
    private users = userList;
    
    findAll(role?: 'INTERN'| 'ENGINEER' | 'ADMIN') {
        if(role) {
            const rolesArray = this.users.filter(user => user.role === role);
            if(rolesArray.length === 0) throw new NotFoundException('User role not found');
            return rolesArray;
        }
        return this.users;
    }
    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if(!user) throw new NotFoundException('User not found');
        return user;
    }
    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort( (a, b) => b.id - a.id );
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user;
        })
        return this.findOne(id);
    }
    delete(id: number) {
        const removeedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removeedUser;
    }
}

const userList = [
    {
        id: 1,
        name: "AAA",
        email: "aaa@gmail.com",
        role: "admin"
    },
    {
        id: 2,
        name: "BBB",
        email: "bbb@gmail.com",
        role: "user"
    },
    {
        id: 3,
        name: "CCC",
        email: "ccc@gmail.com",
        role: "admin"
    },
    {
        id: 4,
        name: "DDD",
        email: "ddd@gmail.com",
        role: "INTERN"
    }
]