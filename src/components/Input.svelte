<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  export let role: "Emotion" | "Raison" | null = null;
  export let message: App.Types["Message"] | undefined = undefined;
  let content: string = "";
  const saveMessage = async () => {
    const res = await fetch("https://auto-chat.pages.dev/api", {
      method: message ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role,
        date: new Date().toISOString(),
        ...(message || {}),
        content
      })
    });
    await invalidateAll();
  };
</script>

<div class="flex sticky bottom-0 items-center left-0 gap-10 mx-auto p-2">
  <textarea class="textarea textarea-primary flex-1" placeholder="Bio" bind:value={content} />
  <button class="btn btn-primary" on:click={saveMessage}> save message </button>
</div>
