import { CreateUserDto } from './create-user';

interface UpdateUserDto extends CreateUserDto {
    id: string;
}

export default async (userDto: UpdateUserDto) => {
    return userDto;
};
