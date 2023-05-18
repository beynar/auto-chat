<script lang="ts">
  let value: string = "";
  export let data;

  $: {
    console.log({ data });
  }
  const saveMessage = async () => {
    const message = {
      role: "Emotion",
      content: value,
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
  };
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input type="text" bind:value />
<button on:click={saveMessage}> save message </button>
