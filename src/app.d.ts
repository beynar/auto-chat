// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      messages: Types["Message"][];
    }
    interface Types {
      Message: {
        date: string;
        content: string;
        role: "Emotion" | "Raison";
      };
    }
    interface Platform {
      env?: {
        DB: import("@cloudflare/workers-types").D1Database;
      };
    }
  }
}

export {};
