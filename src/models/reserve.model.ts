import { CinemaModel } from "./cinema.model"


export interface ReserveModel {
    id: number
    movieId: number
    movieTitle: string
    director: string
    cinema: CinemaModel
    description: string
    pricePerItem: number
    ticketNumber: number
    status: 'rezervisano' | 'gledano' | 'otkazano'
    rating: null | boolean
}