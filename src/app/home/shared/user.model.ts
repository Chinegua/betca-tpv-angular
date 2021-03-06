import { Role } from '../../core/role.model';

export interface User {
    mobile: number;
    username: string;
    email?: string;
    dni?: string;
    address?: string;
    registrationDate?: Date;
    active?: boolean;
    password?: string;
    role?: string[];
}
