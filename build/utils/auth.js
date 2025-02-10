"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "minha-chave-secreta";
const generateToken = (user) => {
    const token = jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: "1h" });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.header("x-access-token");
    if (!token) {
        return res.status(401).json({ message: "Acesso não autorizado" });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Acesso não autorizado" });
        }
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
