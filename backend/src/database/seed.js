import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const seedDatabase = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Insert sample products
    const products = [
      ['Professional Laptop', 'High-performance laptop for professionals', 1299.99, 50, 'Electronics', 'https://via.placeholder.com/300?text=Laptop'],
      ['Wireless Headphones', 'Premium noise-cancelling headphones', 199.99, 100, 'Audio', 'https://via.placeholder.com/300?text=Headphones'],
      ['Smartphone', 'Latest generation smartphone', 899.99, 75, 'Electronics', 'https://via.placeholder.com/300?text=Phone'],
      ['Tablet', 'Portable tablet with stylus', 499.99, 60, 'Electronics', 'https://via.placeholder.com/300?text=Tablet'],
      ['Smart Watch', 'Fitness tracking smart watch', 299.99, 80, 'Wearables', 'https://via.placeholder.com/300?text=Watch'],
    ];

    for (const product of products) {
      await client.query(
        'INSERT INTO products (name, description, price, stock, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
        product
      );
    }

    console.log('✅ Database seeded with sample data!');
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

seedDatabase();
