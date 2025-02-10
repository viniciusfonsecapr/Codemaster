// app.ts
import express, { Request, Response, NextFunction } from "express";
import { Pool } from "pg";
import { ProductModel } from "./routes/products";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Configuração do banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

// Instância do modelo de produtos
const productModel = new ProductModel(pool);

// Middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// Rotas
app.get("/produtos", async (req: Request, res: Response) => {
  try {
    const produtos = await productModel.getAllProducts();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

app.get("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const produto = await productModel.getProduct(id);
    if (!produto) {
      res.status(404).json({ message: "Produto não encontrado" });
    } else {
      res.json(produto);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
});

app.post("/produtos", async (req: Request, res: Response) => {
  try {
    const { nome, preco } = req.body;
    if (!nome || !preco) {
      res.status(400).json({ message: "Nome e preço são obrigatórios" });
    } else {
      const produto = await productModel.createProduct(nome, preco);
      res.json(produto);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
});

app.put("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;
    if (!nome || !preco) {
      res.status(400).json({ message: "Nome e preço são obrigatórios" });
    } else {
      const produto = await productModel.updateProduct(id, nome, preco);
      if (!produto) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.json(produto);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
});

app.delete("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await productModel.deleteProduct(id);
    res.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao excluir produto" });
  }
});

// Rota padrão (não encontrada)
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Inicialização do servidor
const port = parseInt(process.env.PORT as string) || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
