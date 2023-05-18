import { dev } from "$app/environment";

export const load = async ({ platform }) => {
  if (dev || !platform?.env?.DB) {
    const { results, meta, error } = await fetch("https://auto-chat.pages.dev/api").then((res) => res.json());
    return {
      messages: results as App.Types["Message"][],
      meta,
      error
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
