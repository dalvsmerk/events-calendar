import { FindUserDto, ReadUserDto } from '../dto';
import { findUserById } from '../repository/user';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (userDto: FindUserDto): Promise<ReadUserDto> => {
    return findUserById(userDto.id);
}
