import knex from "knex"

export const getUserById = (id: string) => {
    return knex('users').where({ id }).first();
};