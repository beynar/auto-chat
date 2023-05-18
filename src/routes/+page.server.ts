import { dev } from "$app/environment";

export const load = async ({ platform }) => {
  if (dev || !platform?.env?.DB) {
  } else {
    const getMessageSql = /*SQL */ `
        SELECT * FROM messages
        `;
    const messages = await platform?.env.DB.exec<App.Types["Message"]>(getMessageSql);
    return {
      messages
    };
  }
};
