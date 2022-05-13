import { CreateUserDto, ReadUserDto } from '../dto';

export default async (userDto: CreateUserDto): Promise<ReadUserDto | null> => {
    return {
        id: '2323423423423423',
        email: userDto.email,
        full_name: userDto.full_name,
    };
};
