<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import Pencil from "../Icons/Pencil.svelte";
  import Trash from "../Icons/Trash.svelte";
  import Input from "./Input.svelte";
  export let message: App.Types["Message"];
  $: ({ content, date, role } = message);
  let editedCont;
  let editionMode = false;

  const deleteMessage = async () => {
    const res = await fetch("https://auto-chat.pages.dev/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date
      })
    });
    await invalidateAll();
  };
</script>

<div
  class={`card group relative  card-compact h-fit shadow w-fit max-w-1/3  ${
    role === "Emotion" ? "mr-auto bg-secondary" : "ml-auto bg-primary"
  }`}
>
  <div
    class="absolute left-0 -top-2 bg-white rounded shadow opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto gap-2 flex items-center p-1"
  >
    <button
      class="p-1 border border-slate-300 rounded"
      on:click={() => {
        editionMode = !editionMode;
      }}
    >
      <Pencil class="w-4" />
    </button>
    <button class="p-1 border border-slate-300 rounded" on:click={deleteMessage}>
      <Trash class="w-4" />
    </button>
  </div>
  <div class="card-body">
    {#if editionMode}
      <Input
        on:sent={() => {
          editionMode = !editionMode;
        }}
        {role}
        {message}
      />
    {:else}
      {content}
    {/if}
  </div>
</div>
