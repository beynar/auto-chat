import { json } from "@sveltejs/kit";

export async function GET({ platform }) {
  if (platform?.env?.DB) {
    const getMessageSql = /*SQL */ `
        SELECT * FROM messages
        `;
    const { results, error } = await platform?.env.DB.exec<App.Types["Message"]>(getMessageSql);

    return json({ messages: results, error });
  } else {
    return json({
      messages: [],
      error: "No DB"
    });
  }
}

export async function POST({ platform, request }) {
  const { content, role } = await request.json();
  if (platform?.env?.DB) {
    const insertMessageSql = /*SQL */ `
        INSERT INTO messages (content, role) VALUES ($1, $2)
        `;
    const query = platform?.env.DB.prepare(insertMessageSql);
    query.bind(content, role);
    const { results, error } = await query.all<App.Types["Message"]>();
    return json({ messages: results, error });
  }
}

export async function DELETE({ platform, request }) {
  const { id } = await request.json();
  if (platform?.env?.DB) {
    const deleteMessageSql = /*SQL */ `
            DELETE FROM messages WHERE id = $1
            `;
    const query = platform?.env.DB.prepare(deleteMessageSql);
    query.bind(id);
    const { results, error } = await query.all<App.Types["Message"]>();
    return json({ messages: results, error });
  }
}
