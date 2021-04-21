<script lang="ts">
	import Dial from './Dial.svelte';
  import roundToNearest from "./utils/roundToNearest"

  export let base: number = 10
  export let places: number = 1
	let odometerValue = 0

  $: getDialValue = (factor) => {
    console.log(factor, Math.floor(odometerValue / factor))
    //Each dial needs to track its value and the values of the dials above it,
    //which is necessary to have smooth animations when we wrap around start and end digits:
    //ie between 9 and 0 in base ten.
    //Also floor the value into an integer to avoid intermediate dial positions.
    return Math.floor(odometerValue / factor)
  }
  function makeSetValueFunction(factor: number) {
    return (
      (difference: number) => {
  			odometerValue += roundToNearest(factor*difference, factor)
      }
    )
  }

  $:digits = Array.from(Array(base).keys())
  $:factors = Array(places).fill(0).map((_, i) => Math.pow(base, i))
</script>

<main>
  <p><b>Value:</b> {odometerValue}</p>
	<div class="odometer-container">
    <div class="odometer">
      {#each factors as factor, i}
        <Dial
          {base}
          {digits}
          setValue={makeSetValueFunction(factor)}
          value={getDialValue(factor)}
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
