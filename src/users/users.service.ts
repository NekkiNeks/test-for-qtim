import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) { 
    
    const contains = this.users.some(user => user.username === createUserDto.username);

    if (contains) throw new BadRequestException('Пользователь с таким именем уже существует');

    const newUser = new User(createUserDto.username, createUserDto.password);
    this.users.push(newUser);

    return newUser
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id === id);

    if (index < 0) throw new BadRequestException('Пользователь с таким ID не найден');
    if (updateUserDto.username) this.users[index].username = updateUserDto.username;
    if (updateUserDto.password) this.users[index].username = updateUserDto.password;
    if (updateUserDto.refreshToken) this.users[index].refreshToken = updateUserDto.refreshToken;
  }

  findAll() {
    return this.users;
  }

  findOneByUsername(username: string) {
    const user: User | undefined = this.users.find(user => user.username === username);
    
    if (!user) throw new BadRequestException('Пользователь с таким логином не найден');

    return user;
  }

  findOneById(id: string) {
    const user: User | undefined = this.users.find(user => user.id === id);
    
    if (!user) throw new BadRequestException('Пользователь с таким ID не найден');

    return user;
  }

  remove(id: string) {
    this.users = this.users.filter(user => user.id !== id);
  }
}
