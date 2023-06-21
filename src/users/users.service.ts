import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // to create a new User
  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const hashedPassword = hashPassword(password);
    return this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
  }

  // to get all users
  findAll() {
    return this.prisma.user.findMany();
  }

  //to find a specific user with given id
  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  //to find authenticated user
  getProfile() {
    return this.prisma.user;
  }
  // to update User
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // to delete a specific user with given id
  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
