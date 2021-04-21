<script lang="ts">
	import Dial from './Dial.svelte';

  export let base: number = 10
  export let places: number = 1
	export let value = 0

  $:digits = Array.from(Array(base).keys())
  $:placesArray = Array(places)
</script>

<main>
	<div class="odometer-container">
    <div class="odometer">
      {#each placesArray as p, i}
        <Dial
          {base}
          {digits}
          factor={Math.pow(base, i)}
          bind:value={value}
        />
      {/each}

      <div class="pointer">&#9664;</div>
    </div>
  </div>
</main>

<style>
	main {
	}

  .odometer {
    display: flex;
    flex-direction: row-reverse;

    position: relative;
  }
  .odometer-container {
    display: flex;
    justify-content: center;
  }

  .pointer {
    color: red;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(100%, -50%);
  }
</style>
