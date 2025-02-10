import { Pool } from "pg";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  categoryId: number;
}

export default class ProductModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllProducts(): Promise<Product[]> {
    const result = await this.pool.query("SELECT * FROM products");
    return result.rows;
  }

  async getProductById(id: number): Promise<Product> {
    const result = await this.pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  async createProduct(product: Product): Promise<Product> {
    const result = await this.pool.query(
      "INSERT INTO products (name, price, quantity, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [product.name, product.price, product.quantity, product.categoryId]
    );
    return result.rows[0];
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    const result = await this.pool.query(
      "UPDATE products SET name = $1, price = $2, quantity = $3, category_id = $4 WHERE id = $5 RETURNING *",
      [product.name, product.price, product.quantity, product.categoryId, id]
    );
    return result.rows[0];
  }

  async deleteProduct(id: number): Promise<void> {
    await this.pool.query("DELETE FROM products WHERE id = $1", [id]);
  }
}
