import { FindUserDto, ReadUserDto } from '../dto';
import { findUserById } from '../repository/user';

export default async (userDto: FindUserDto): Promise<ReadUserDto> => await findUserById(userDto.id);
