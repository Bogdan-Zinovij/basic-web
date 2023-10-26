import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @ApiProperty({
    example: 'username1',
    required: true,
    nullable: false,
    minLength: 1,
    maxLength: 32,
  })
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @ApiProperty({
    example: 'password1234',
    required: true,
    nullable: false,
    minLength: 8,
    maxLength: 16,
  })
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(8)
  @MaxLength(256)
  @ApiProperty({
    example: 'example@mail.com',
    required: true,
    nullable: false,
    minLength: 8,
    maxLength: 256,
  })
  public readonly email: string;

  // розыбратися з типом
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 1,
    required: true,
    nullable: false,
    minLength: 1,
    maxLength: 2,
  })
  public readonly variant: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({
    example: 'AA-01',
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 5,
  })
  public readonly group: string;
}
