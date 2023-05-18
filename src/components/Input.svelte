<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  export let role: "Emotion" | "Raison" | null = null;
  let content: string = "";
  const saveMessage = async () => {
    const message = {
      role,
      content,
      date: new Date().toISOString()
    };
    const res = await fetch("https://auto-chat.pages.dev/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
    console.log(await res.json());
    const messages = await fetch("/api").then((res) => res.json());
    console.log({ messages });
    await invalidateAll();
  };
</script>

<div class="flex sticky bottom-0 items-center left-0 gap-10 mx-auto p-2">
  <textarea class="textarea textarea-primary flex-1" placeholder="Bio" bind:value={content} />
  <button class="btn btn-primary" on:click={saveMessage}> save message </button>
</div>
