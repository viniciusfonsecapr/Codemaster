// product-model.ts
import { Pool } from "pg";

export class ProductModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllProducts(): Promise<any[]> {
    const result = await this.pool.query("SELECT * FROM produtos");
    return result.rows;
  }

  async getProduct(id: number): Promise<any> {
    const result = await this.pool.query(
      "SELECT * FROM produtos WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  async createProduct(name: string, price: number): Promise<any> {
    const result = await this.pool.query(
      "INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    return result.rows[0];
  }

  async updateProduct(id: number, name: string, price: number): Promise<any> {
    const result = await this.pool.query(
      "UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *",
      [name, price, id]
    );
    return result.rows[0];
  }

  async deleteProduct(id: number): Promise<void> {
    await this.pool.query("DELETE FROM produtos WHERE id = $1", [id]);
  }
}
