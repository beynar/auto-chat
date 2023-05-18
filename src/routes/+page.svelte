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

<div class="flex">
  <div class="flex-1 bg-secondary bg-opacity-20">
    <Feed messages={data.messages} />
    <Input role="Emotion" />
  </div>
  <div class="divider m-0 divider-horizontal w-1" />
  <div class="flex-1 bg-primary bg-opacity-20">
    <Feed messages={data.messages} />
    <Input role="Raison" />
  </div>
</div>
