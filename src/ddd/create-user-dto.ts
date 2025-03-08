export type CreateUserUseCaseDTO = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type CreateUserResponseDTO = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
};
