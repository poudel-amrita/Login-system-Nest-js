import { Role, Status } from '@prisma/client';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from '@nestjs/class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty({ default: 'USER' })
  role: Role;

  @IsOptional()
  @ApiProperty({ default: 'ACTIVE' })
  status: Status;
}
