import { query } from '../config/database.js';
import { getCache, setCache } from '../config/redis.js';
import { logger } from '../config/logger.js';

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const offset = (page - 1) * limit;

    const cacheKey = `products:${category}:${page}:${limit}`;
    const cachedProducts = await getCache(cacheKey);

    if (cachedProducts) {
      return res.json({ success: true, data: cachedProducts, cached: true });
    }

    let sql = 'SELECT * FROM products';
    let params = [];

    if (category) {
      sql += ' WHERE category = $1';
      params = [category];
    }

    sql += ' LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await query(sql, params);

    await setCache(cacheKey, result.rows, 3600);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    logger.error(`Get products error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const cacheKey = `product:${id}`;
    const cachedProduct = await getCache(cacheKey);

    if (cachedProduct) {
      return res.json({ success: true, data: cachedProduct, cached: true });
    }

    const result = await query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await setCache(cacheKey, result.rows[0], 3600);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    logger.error(`Get product error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query required' });
    }

    const result = await query(
      'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1',
      [`%${q}%`]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    logger.error(`Search products error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const result = await query(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, stock, category, imageUrl]
    );

    logger.info(`Product created: ${result.rows[0].id}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    logger.error(`Create product error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;

    const result = await query(
      'UPDATE products SET name = COALESCE($1, name), description = COALESCE($2, description), price = COALESCE($3, price), stock = COALESCE($4, stock), category = COALESCE($5, category), image_url = COALESCE($6, image_url) WHERE id = $7 RETURNING *',
      [name, description, price, stock, category, imageUrl, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    logger.info(`Product updated: ${id}`);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    logger.error(`Update product error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    logger.info(`Product deleted: ${id}`);

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    logger.error(`Delete product error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
