import pg from "pg";
const { Client } = pg;

export async function provisionTenantDatabase(dbName: string) {
  // 1. Admin connection se naya Database create karein
  const adminClient = new Client({
    connectionString: process.env.ADMIN_DATABASE_URL || "postgresql://postgres:yourownstore@127.0.0.1:5432/postgres",
  });

  await adminClient.connect();

  // Check agar database pehle se nahi bana hai
  const checkDb = await adminClient.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbName]
  );

  if (checkDb.rowCount === 0) {
    await adminClient.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database ${dbName} created successfully.`);
  }

  await adminClient.end();

  // 2. Naye Database se connect karke usme Tables banayein
  const tenantClient = new Client({
    connectionString: `postgresql://postgres:yourownstore@127.0.0.1:5432/${dbName}`,
  });

  await tenantClient.connect();

  console.log(`Creating tables inside ${dbName}...`);

  await tenantClient.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Products Table
    CREATE TABLE IF NOT EXISTS "products" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "description" text DEFAULT '',
      "image" text NOT NULL,
      "price" numeric(10, 2) NOT NULL,
      "compare_at_price" numeric(10, 2),
      "sku" text NOT NULL,
      "inventory" integer DEFAULT 0 NOT NULL,
      "category" text DEFAULT 'General' NOT NULL,
      "tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "variants" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "seo_title" text DEFAULT '' NOT NULL,
      "seo_description" text DEFAULT '' NOT NULL,
      "status" text DEFAULT 'active' NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );

    -- Orders Table
    CREATE TABLE IF NOT EXISTS "orders" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "number" integer NOT NULL,
      "customer_name" text NOT NULL,
      "customer_email" text NOT NULL,
      "items" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "subtotal" numeric(10, 2) NOT NULL,
      "shipping" numeric(10, 2) DEFAULT 0 NOT NULL,
      "discount" numeric(10, 2) DEFAULT 0 NOT NULL,
      "total" numeric(10, 2) NOT NULL,
      "payment_status" text DEFAULT 'paid' NOT NULL,
      "fulfillment_status" text DEFAULT 'processing' NOT NULL,
      "address" jsonb,
      "created_at" timestamp DEFAULT now() NOT NULL
    );

    -- Customers Table
    CREATE TABLE IF NOT EXISTS "customers" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "email" text NOT NULL,
      "phone" text DEFAULT '',
      "city" text DEFAULT '',
      "orders_count" integer DEFAULT 0 NOT NULL,
      "total_spent" numeric(10, 2) DEFAULT 0 NOT NULL,
      "last_order_at" timestamp,
      "status" text DEFAULT 'active' NOT NULL,
      "notes" text DEFAULT ''
    );

    -- Campaigns Table
    CREATE TABLE IF NOT EXISTS "campaigns" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "type" text DEFAULT 'campaign' NOT NULL,
      "recipients" integer DEFAULT 0 NOT NULL,
      "sent" integer DEFAULT 0 NOT NULL,
      "open_rate" numeric(5, 1) DEFAULT 0 NOT NULL,
      "status" text DEFAULT 'draft' NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `);

  console.log(`All tables created inside ${dbName}!`);
  await tenantClient.end();
}