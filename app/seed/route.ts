import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  try {
    // 1. Create uuid extension
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // 2. Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    // 3. Hash password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // 4. Insert ONLY ONE admin user
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (
        'Admin',
        'admin@test.com',
        ${hashedPassword}
      )
      ON CONFLICT (email) DO NOTHING;
    `;

    return Response.json({
      message: "Users table created + admin user added",
    });
  } catch (error) {
    return Response.json(
      { error: "Seeding failed", details: String(error) },
      { status: 500 }
    );
  }
}