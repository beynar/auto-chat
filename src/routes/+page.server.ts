import { dev } from "$app/environment";

export const load = async ({ platform }) => {
  if (dev || !platform?.env?.DB) {
    return {
      messages: []
    };
  } else {
    const getMessageSql = /*SQL */ `
        SELECT * FROM messages
        `;
    const { results, meta, error } = await platform?.env.DB.prepare(getMessageSql).all<App.Types["Message"]>();
    return {
      messages: results,
      meta,
      error
    };
  }
};
