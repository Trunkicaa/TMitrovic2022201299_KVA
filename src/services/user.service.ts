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
                    phone: '666',
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

        for (let u of users) {
            if (u.email == model.email) {
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
        const activeEmail = localStorage.getItem('active');
        if (!activeEmail) return null;

        const users = this.retrieveUsers(); 
        return users.find(user => user.email === activeEmail) || null;
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

    static deleteReservation(reserveId: number): boolean {
        let users = this.retrieveUsers();
        const activeEmail = localStorage.getItem('active');
        if (!activeEmail) return false;
        const userIndex = users.findIndex(u => u.email === activeEmail);
        if (userIndex === -1) return false;
        const reserveIndex = users[userIndex].reserve.findIndex(r => r.id === reserveId);
        if (reserveIndex === -1) return false;
        users[userIndex].reserve.splice(reserveIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
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

    static changeAddress(newAddress: string): boolean {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.address = newAddress
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }
        return false
    }

    static changeFirstName(newFirstName: string): boolean {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.firstName = newFirstName
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }
        return false
    }

    static changeLastName(newLastName: string): boolean {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.lastName = newLastName
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }
        return false
    }

    static changePhoneNumber(newPhoneNumber: string): boolean {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.phone = newPhoneNumber
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