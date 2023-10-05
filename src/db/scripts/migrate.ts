import { migrate } from "drizzle-orm/libsql/migrator";
import config from "../../../drizzle.config";
import { db } from "../db";

const migrationsFolder = config.out;

console.log(`Running migrations from ${migrationsFolder}...`);

migrate(db, { migrationsFolder })
  .then(() => {
    console.log("🚀 Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🚨 Migration failed!", err);
    process.exit(1);
  });
