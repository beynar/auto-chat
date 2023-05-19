<script lang="ts">
  import { fade } from "svelte/transition";
  import Message from "./Message.svelte";
  import { flip } from "svelte/animate";
  export let messages: App.Types["Message"][];
</script>

<div class="min-h-screen flex flex-col gap-2 p-2 w-full overflow-hidden">
  {#each messages as message, i (message.date)}
    <div animate:flip in:fade out:fade>
      <Message {message} />
    </div>
  {/each}
</div>
