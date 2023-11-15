import { demoPool as pool } from "@db/pool";
import { resetDatabase } from "@db/utils";
import {
  demoCreateQuery as createQuery,
  demoInsertQuery as insertQuery,
} from "@db/queries";

export default async (req, res) => {
  const result = await resetDatabase(pool, createQuery, insertQuery);
  if (result.error) {
    return res.status(500).json(result);
  }
  return res.status(200).json(result);
};
