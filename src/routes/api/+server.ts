import { json } from "@sveltejs/kit";

export async function GET({ platform }) {
  if (platform?.env?.DB) {
    const getMessageSql = /*SQL */ `
        SELECT * FROM messages
        `;
    const dbResult = await platform?.env.DB.prepare(getMessageSql).all<App.Types["Message"]>();

    return json(dbResult);
  } else {
    return json({
      messages: [],
      error: "No DB"
    });
  }
}

export async function POST({ platform, request }) {
  const { content, role, date } = await request.json();
  if (platform?.env?.DB) {
    try {
      const insertMessageSql = /*SQL */ `
        INSERT INTO messages (content, role, date) VALUES (?, ?, ?)
        `;
      const { results, error } = await platform?.env.DB.prepare(insertMessageSql)
        .bind(content, role, date)
        .all<App.Types["Message"]>();

      return json({ messages: results, error });
    } catch (error) {
      console.log({ error });
      return json({
        error,
        content,
        role,
        date
      });
    }
  } else {
    return json({
      messages: [],
      error: "No DB"
    });
  }
}
export async function PATCH({ platform, request }) {
  const { content, role, date } = await request.json();
  if (platform?.env?.DB) {
    const updateMessageSql = /*SQL */ `
                UPDATE messages SET content = ?, role = ?, date = ? WHERE date = ?
                `;
    const { results, error } = await platform?.env.DB.prepare(updateMessageSql)
      .bind(content, role, date, date)
      .all<App.Types["Message"]>();

    return json({ messages: results, error });
  }
}

export async function DELETE({ platform, request }) {
  const { date } = await request.json();
  if (platform?.env?.DB) {
    const deleteMessageSql = /*SQL */ `
                DELETE FROM messages WHERE date = ?
                `;
    const { results, error } = await platform?.env.DB.prepare(deleteMessageSql).bind(date).all<App.Types["Message"]>();
    return json({ messages: results, error });
  }
}
