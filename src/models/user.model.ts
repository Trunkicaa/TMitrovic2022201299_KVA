import { ReserveModel } from "./reserve.model"

export interface UserModel {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    password: string;
    reserve: ReserveModel[];
    selectedGenres?: string[];
}