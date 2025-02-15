/** @type { import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_5NeFExkjd7zJ@ep-square-paper-a8skrwi6-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require',
  }
};