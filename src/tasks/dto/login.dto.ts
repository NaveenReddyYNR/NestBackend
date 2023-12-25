import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class LoginAccountDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: false })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;
}

export class SignupAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: false })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;
}
