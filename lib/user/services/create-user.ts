import { CreateUserDto, ReadUserDto } from '../dto';
import { insertUser } from '../repository/user';

export default async (userDto: CreateUserDto): Promise<ReadUserDto> => await insertUser(userDto);
