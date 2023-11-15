import { Pool } from "pg";

export const demoPool = new Pool({
  user: "cs377_students",
  host: "20.98.38.207",
  database: "demo",
  password: "cs377_students_password",
  port: 5432,
});

export const demo3Pool = new Pool({
  user: "cs377_students",
  host: "20.98.38.207",
  database: "demo3",
  password: "cs377_students_password",
  port: 5432,
});
