#!/bin/sh

# Run knex migrations using ts-node with the proper module system
npx ts-node -O '{"module":"CommonJS"}' ./node_modules/.bin/knex migrate:rollback --all --env production
