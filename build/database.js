"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class ProductModel {
    constructor(pool) {
        this.pool = pool;
    }
}
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "estoquedb",
    password: "1234",
    port: 5432,
});
const productModel = new ProductModel(pool);
