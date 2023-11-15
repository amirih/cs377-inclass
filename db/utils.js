export const databaseQuery = async (pool, queryString) => {
  let client;
  try {
    client = await pool.connect();
    const queryResult = await client.query(queryString);
    return { data: queryResult.rows };
  } catch (err) {
    return { error: err.message };
  } finally {
    if (client) {
      client.release();
    }
  }
};

export const getTables = async (pool) => {
  const queryString = `SELECT tablename 
  FROM pg_catalog.pg_tables 
  WHERE schemaname NOT IN ('pg_catalog', 'information_schema');`;
  const queryResult = await databaseQuery(pool, queryString);
  return queryResult;
};

export const resetDatabase = async (pool, createQuery, insertQuery) => {
  const queryResult = await databaseQuery(pool, createQuery);
  if (queryResult.error) {
    return queryResult;
  }
  const insertResult = await databaseQuery(pool, insertQuery);
  return insertResult;
};
