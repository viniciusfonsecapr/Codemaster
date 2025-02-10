"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
class ProductModel {
    constructor(pool) {
        this.pool = pool;
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM produtos");
            return result.rows;
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
            return result.rows[0];
        });
    }
    createProduct(name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *", [name, price]);
            return result.rows[0];
        });
    }
    updateProduct(id, name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *", [name, price, id]);
            return result.rows[0];
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query("DELETE FROM produtos WHERE id = $1", [id]);
        });
    }
}
exports.ProductModel = ProductModel;
