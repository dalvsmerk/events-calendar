export interface CreateUserDto {
    id: string;
    email: string;
    password: string;
    full_name?: string;
}

export interface UpdateUserDto extends CreateUserDto {
    id: string;
}

export interface FindUserDto {
    id: string;
}

export interface ReadUserDto {
    id: string;
    email: string;
    full_name?: string;
}
