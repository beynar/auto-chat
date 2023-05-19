<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { createEventDispatcher, onMount } from "svelte";
  import Paper from "../Icons/Paper.svelte";
  import autosize from "./autosize";
  export let role: "Emotion" | "Raison" | null = null;
  export let message: App.Types["Message"] | undefined = undefined;
  let content: string = message?.content || "";
  let loading = false;
  const dispatch = createEventDispatcher<{
    sent: () => void;
  }>();
  const saveMessage = async () => {
    if (content.trim() === "") return;
    loading = true;
    await fetch("https://auto-chat.pages.dev/api", {
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
    content = "";
    await invalidateAll();
    if (!message) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 200);
    }
    dispatch("sent");
    loading = false;
  };
  let textarea: HTMLTextAreaElement;
  onMount(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.shiftKey) {
        if (textarea && document.activeElement !== textarea) return;
        saveMessage();
      }
    });
  });
</script>

<div class="flex sticky bottom-0 items-center left-0 gap-4 mx-auto p-2">
  {#if loading}
    <div class="w-full flex justify-center items-center">
      <div class="radial-progress animate-spin" style="--value:70;  --size:2rem; --thickness: 1px;" />
    </div>
  {:else}
    <textarea
      bind:this={textarea}
      use:autosize
      class="textarea resize-none textarea-primary flex-1"
      placeholder={role}
      bind:value={content}
    />
    <button class="btn btn-primary btn-circle btn-outline p-2 btn-md" on:click={saveMessage}>
      <Paper />
    </button>
  {/if}
</div>
