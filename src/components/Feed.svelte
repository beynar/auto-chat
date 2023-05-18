<script lang="ts">
  import { fade } from "svelte/transition";
  import Message from "./Message.svelte";
  export let messages: App.Types["Message"][];
</script>

<div class="min-h-screen flex flex-col gap-2 p-2">
  {#each messages as message, i (message.date)}
    <div in:fade={{ delay: i * 50 }} out:fade={{ delay: i * 50, duration: 200 }}>
      <Message {message} />
    </div>
  {/each}
</div>
