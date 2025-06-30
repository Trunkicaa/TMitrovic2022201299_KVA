import { ReserveModel } from "./reserve.model"

export interface UserModel {
    email: string
    password: string
    reserve: ReserveModel[]
}