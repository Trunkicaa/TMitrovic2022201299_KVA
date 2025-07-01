import { ReserveModel } from "./reserve.model"

export interface UserModel {
    email: string
    firstName: string
    lastName: string
    phone: number
    address: string
    password: string
    reserve: ReserveModel[]
    selectedGenres?: string[];
}