import { demo3Pool as pool } from "@db/pool";
import { resetDatabase } from "@db/utils";
import {
  demo3CreateQuery as createQuery,
  demo3InsertQuery as insertQuery,
} from "@db/queries";

export default async (req, res) => {
  const result = await resetDatabase(pool, createQuery, insertQuery);
  if (result.error) {
    return res.status(500).json(result);
  }
  return res.status(200).json(result);
};
