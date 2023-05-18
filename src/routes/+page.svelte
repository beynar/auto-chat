<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { slide } from "svelte/transition";

  export let data;
  $: {
    console.log({ data });
  }
  let content: string = "";
  const saveMessage = async () => {
    const message = {
      role: "Emotion",
      content,
      date: new Date().toISOString()
    };
    const res = await fetch("/api", {
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

<div class="min-h-screen">
  {#each data.messages as { content, date, role }, i (date)}
    <div
      in:slide={{ delay: i * 50 }}
      out:slide={{ delay: i * 50, duration: 200 }}
      class={`card card-compact shadow w-fit max-w-1/3 mx-auto ${role === "Emotion" ? "bg-primary" : "bg-secondary"}`}
    >
      <div class="card-body">
        {content}
      </div>
    </div>
  {/each}
</div>
<div class="flex sticky bottom-0 items-center left-0 gap-10 mx-auto p-2">
  <textarea class="textarea textarea-primary flex-1" placeholder="Bio" bind:value={content} />
  <button class="btn btn-primary" on:click={saveMessage}> save message </button>
</div>
