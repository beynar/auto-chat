import { dev } from "$app/environment";

export const load = async ({ platform }) => {
  if (dev || !platform?.env?.DB) {
    return {
      messages: [
        {
          date: "2021-05-01",
          content: "Hello World",
          role: "Emotion"
        }
      ]
    };
  } else {
    const getMessageSql = /*SQL */ `
        SELECT * FROM messages
        `;
    const { results, meta, error } = await platform?.env.DB.prepare(getMessageSql).all<App.Types["Message"]>();
    return {
      messages: results as App.Types["Message"][],
      meta,
      error
    };
  }
};
