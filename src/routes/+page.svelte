<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { slide } from "svelte/transition";
  import Feed from "../components/Feed.svelte";
  import Input from "../components/Input.svelte";

  export let data;
  $: {
    console.log({ data });
  }
</script>

<div class="grid w-full grid-cols-2">
  <div class=" bg-secondary bg-opacity-20">
    <Feed messages={data.messages} />
    <Input role="Emotion" />
  </div>
  <div class=" bg-primary bg-opacity-20">
    <Feed messages={data.messages} />
    <Input role="Raison" />
  </div>
</div>
