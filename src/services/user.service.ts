import { ReserveComponent } from "../app/reserve/reserve.component";
import { ReserveModel } from "../models/reserve.model";
import { UserModel } from "../models/user.model"

export class UserService {

    static retrieveUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    email: 'user@example.com',
                    password: 'user123',
                    reserve: []
                }
            ];

            localStorage.setItem('users', JSON.stringify(arr));
        }

        return JSON.parse(localStorage.getItem('users')!);
    }


    static login(email: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.email === email && user.password === password) {
                localStorage.setItem('active', user.email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): UserModel | null {
        if (!localStorage.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.email == localStorage.getItem('active')) {
                return user
            }
        }

        return null
    }


    static createReservation(reservation: ReserveModel): boolean {
    const users = this.retrieveUsers(); // get all users from localStorage
    const activeEmail = localStorage.getItem('active');
    if (!activeEmail) return false; // no active user
    for (let user of users) {
        if (user.email === activeEmail) {
            if (!user.reserve) {
                user.reserve = [];
            }
            user.reserve.push(reservation); 
            localStorage.setItem('users', JSON.stringify(users)); 
            return true;
        } }
    return false; 
}



    static changePassword(newPassword: string): boolean {
        
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.password = newPassword
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }

        return false
    }
}