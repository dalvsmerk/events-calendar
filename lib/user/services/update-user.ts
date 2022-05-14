import { ReadUserDto, UpdateUserDto } from '../dto';
import { updateUserById } from '../repository/user';
import { protect } from '../util';

export default async (id: string, userDto: UpdateUserDto): Promise<ReadUserDto> => {
    const user = await updateUserById(id, userDto);

    if (user) {
        return protect(user);
    }

    return user;
};
