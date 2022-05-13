import omit from 'lodash/omit';
import { CreateUserDto, ReadUserDto } from '../dto';
import { insertUser } from '../repository/user';

export default async (userDto: CreateUserDto): Promise<ReadUserDto> => {
    const user = await insertUser(userDto);

    return omit(user, ['password']) as ReadUserDto;
};
