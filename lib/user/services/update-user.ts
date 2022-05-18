import { ReadUserDto, UpdateUserDto } from '../dto';
import { updateUserById } from '../repository/user';

export default async (id: string, userDto: UpdateUserDto): Promise<ReadUserDto> => 
    await updateUserById(id, userDto);
