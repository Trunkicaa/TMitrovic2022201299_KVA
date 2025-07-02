export interface ReserveModel {
    id: number;
    movieId: number;
    movieTitle: string;
    director: string;
    description: string;
    pricePerItem: number;
    ticketNumber: number;
    rating: null | boolean;
    status: 'rezervisano' | 'gledano' | 'otkazano';
    projectionTime: string | null;
    runTime?: number;
    startDate?: string;
    actors?: string[];
}