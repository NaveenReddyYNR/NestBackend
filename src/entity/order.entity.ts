import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, MaxLength, IsString, Matches } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity('login')
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  userName: string;

  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;

  @Column()
  salt: string;
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

@Entity('signup')
export class SignupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  firstName: string;

  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  lastName: string;

  @Column({ unique: false })
  userName: string;

  @Column()
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Value is too short' })
  @MaxLength(10, { message: 'Value is too long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;
}
