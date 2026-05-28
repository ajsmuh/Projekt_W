import { db } from '$lib/server/db';

export async function load() {
  const [images] = await db.query(`SELECT * FROM images ORDER BY votes DESC LIMIT 25`);

  return { images };
}