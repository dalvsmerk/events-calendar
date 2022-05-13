import { ReadUserDto, UpdateUserDto } from '../dto';

export default async (id: string, userDto: UpdateUserDto): Promise<ReadUserDto> => {
    return userDto;
};
