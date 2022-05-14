import { CreateUserDto, ReadUserDto } from '../dto';
import { insertUser } from '../repository/user';
import { protect } from '../util';

export default async (userDto: CreateUserDto): Promise<ReadUserDto> => {
    const user = await insertUser(userDto);

    return protect(user);
};
