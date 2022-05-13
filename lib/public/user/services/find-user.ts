import { FindUserDto, ReadUserDto } from '../dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (userDto: FindUserDto): Promise<ReadUserDto> => {
    return {
        id: '123234234234',
        email: 'email@example.com',
        full_name: 'Nestor Makhno',
    } as ReadUserDto;
}
