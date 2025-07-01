import { ReserveComponent } from "../app/reserve/reserve.component";
import { ReserveModel } from "../models/reserve.model";
import { UserModel } from "../models/user.model"

export class UserService {

    static retrieveUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    email: 'user@example.com',
                    firstName: 'Milisav',
                    lastName: 'Mitrovic',
                    phone: 666,
                    address: 'Pakao 13',
                    password: 'user123',
                    reserve: [],
                    selectedGenres: []
                }
            ];

            localStorage.setItem('users', JSON.stringify(arr));
        }

        return JSON.parse(localStorage.getItem('users')!);
    }

    static createUser(model: UserModel) {
        const users = this.retrieveUsers()

        for(let u of users) {
            if(u.email == model.email) {
                return false
            }
        }
        users.push(model)
        localStorage.setItem('users', JSON.stringify(users))
        return true
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
        console.log('createReservation called with:', reservation);
        const user = this.retrieveUsers();
        const activeEmail = localStorage.getItem('active');
        const activeUser = user.find(u => u.email === activeEmail);
        if (!activeUser) {
            console.log('Active user not found in users list');
            return false;
        }
        if (!activeUser.reserve) {
            activeUser.reserve = [];
        }
        activeUser.reserve.push(reservation);
        localStorage.setItem('users', JSON.stringify(user));
        return true;
    }

    static changeReservationStatus(state: 'rezervisano' | 'gledano' | 'otkazano', id: number): boolean {
        const activeEmail = localStorage.getItem('active');
        if (!activeEmail) return false;

        const arr = this.retrieveUsers();
        const user = arr.find(u => u.email === activeEmail);
        if (!user) return false;

        const reservation = user.reserve.find(r => r.id === id);
        if (!reservation) return false;

        reservation.status = state;
        localStorage.setItem('users', JSON.stringify(arr));
        return true;
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

    static changeRating(rating: boolean, id: number): boolean {
        const activeEmail = localStorage.getItem('active');
        if (!activeEmail) return false;

        const arr = this.retrieveUsers();
        const user = arr.find(u => u.email === activeEmail);
        if (!user) return false;

        const reservation = user.reserve.find(res => res.id === id && res.status === 'gledano');
        if (!reservation) return false;

        reservation.rating = rating;

        localStorage.setItem('users', JSON.stringify(arr));
        return true;
    }

}