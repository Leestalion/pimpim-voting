import knex from "knex"

export const getTripById = (id: string) => {
    return knex('trips').where({ id }).first();
};

export const getAllTrips = () => {
    return knex('trips');
};

export const createTrip = (tripData: any) => {
    return knex('trips').insert(tripData).returning('*');
};