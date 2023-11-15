import { demoPool as pool } from "@db/pool";
import { databaseQuery, getTables } from "@db/utils";

export default async (req, res) => {
  const { query } = req.query;

  let result = null;
  result = await databaseQuery(pool, query);
  const tables = await getTables(pool);
  result.tables = tables.data;

  if (result.error) {
    return res.status(500).json(result);
  }

  return res.status(200).json(result);
};
