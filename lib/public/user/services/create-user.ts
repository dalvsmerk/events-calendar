export interface CreateUserDto {
    email: string;
    password: string;
    full_name?: string;
}

export default async (userDto: CreateUserDto) => {
    return {
        ...userDto,
        id: 1,
    };
};
