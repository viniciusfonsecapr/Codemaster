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
class ProductModel {
    constructor(pool) {
        this.pool = pool;
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM products");
            return result.rows;
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM products WHERE id = $1", [id]);
            return result.rows[0];
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("INSERT INTO products (name, price, quantity, category_id) VALUES ($1, $2, $3, $4) RETURNING *", [product.name, product.price, product.quantity, product.categoryId]);
            return result.rows[0];
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("UPDATE products SET name = $1, price = $2, quantity = $3, category_id = $4 WHERE id = $5 RETURNING *", [product.name, product.price, product.quantity, product.categoryId, id]);
            return result.rows[0];
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query("DELETE FROM products WHERE id = $1", [id]);
        });
    }
}
exports.default = ProductModel;
