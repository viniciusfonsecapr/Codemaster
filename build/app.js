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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const products_1 = require("./routes/products");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "estoquedb",
    password: "1234",
    port: 5432,
});
const productModel = new products_1.ProductModel(pool);
app.get("/produtos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produtos = yield productModel.getAllProducts();
    res.json(produtos);
}));
app.get("/produtos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const produto = yield productModel.getProduct(id);
    if (!produto) {
        res.status(404).json({ message: "Produto não encontrado" });
    }
    else {
        res.json(produto);
    }
}));
app.post("/produtos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, preco } = req.body;
    const produto = yield productModel.createProduct(nome, preco);
    res.json(produto);
}));
app.put("/produtos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;
    const produto = yield productModel.updateProduct(id, nome, preco);
    if (!produto) {
        res.status(404).json({ message: "Produto não encontrado" });
    }
    else {
        res.json(produto);
    }
}));
app.delete("/produtos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield productModel.deleteProduct(id);
    res.json({ message: "Produto excluído com sucesso" });
}));
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
