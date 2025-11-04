/**
 * Initial schema for Store Platform
 */

export async function up(knex) {
  // users
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.string("role").notNullable().defaultTo("merchant");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // stores
  await knex.schema.createTable("stores", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("store_name").notNullable();
    table.string("slug").notNullable().unique();
    table.string("logo_url");
    table.string("status").notNullable().defaultTo("active");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // products
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table
      .integer("store_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("stores")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("description");
    table.decimal("price", 12, 2).notNullable();
    table.integer("stock_qty").notNullable().defaultTo(0);
    table.string("sku");
    table.string("image_url");
    table.string("status").notNullable().defaultTo("active");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.index(["store_id"]);
  });

  // categories (optional feature, kept simple)
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table
      .integer("store_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("stores")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.index(["store_id"]);
  });

  // order_items
  await knex.schema.createTable("order_items", (table) => {
    table.increments("id").primary();
    table
      .integer("store_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("stores")
      .onDelete("CASCADE");
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.integer("quantity").notNullable();
    table.decimal("unit_price", 12, 2).notNullable();
    table.string("phone_number");
    table.integer("status_of_orders").notNullable().defaultTo(1);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.index(["store_id", "product_id"]);
  });

  // password_reset_tokens
  await knex.schema.createTable("password_reset_tokens", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("token").notNullable();
    table.timestamp("expires_at").notNullable();
    table.boolean("used").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.index(["user_id", "token"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("password_reset_tokens");
  await knex.schema.dropTableIfExists("order_items");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("products");
  await knex.schema.dropTableIfExists("stores");
  await knex.schema.dropTableIfExists("users");
}


