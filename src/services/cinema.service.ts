import { CinemaModel } from "../models/cinema.model";

export class CinemaService {
    static getCinemas(): CinemaModel[] {
        return [
            {
                id: 1,
                name: 'Cineplexx',
                country: 'Srbija',
                website: 'https://www.cineplexx.rs/film?date=2025-06-29&category=now&location=all'
            },

            {
                id: 2,
                name: 'CineStar',
                country: 'Srbija',
                website: 'https://cinestarcinemas.rs/'
            },

            {
                id: 3,
                name: 'TuckWood',
                country: 'Srbija',
                website: 'https://www.tuck.rs/'
            },
        ]
    }
}