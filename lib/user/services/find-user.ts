import { FindUserDto, ReadUserDto } from '../dto';
import { findUserById } from '../repository/user';
import { protect } from '../util';

export default async (userDto: FindUserDto): Promise<ReadUserDto> => {
    const user = await findUserById(userDto.id);

    if (user) {
        return protect(user);
    }

    return user;
}
