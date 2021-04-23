<script lang="ts">
	import Dial from './Dial.svelte';
  import { DIAL_WIDTH } from './utils/constants'
  import roundToNearest from "./utils/roundToNearest"

  export let base: number = 10
  export let initialValue: number = 0
  export let label: string = ""
  export let places: number = 1
  export let showDecimalValue: boolean = true
	export let value = initialValue

  $: getDialValue = (factor) => {
    //Each dial needs to track its value and the values of the dials above it,
    //which is necessary to have smooth animations when we wrap around start and end digits:
    //ie between 9 and 0 in base ten.
    //Also floor the value into an integer to avoid intermediate dial positions.
    return Math.floor(value / factor)
  }
  function makeSetValueFunction(factor: number) {
    return (
      (difference: number) => {
  			value += roundToNearest(factor*difference, factor)
      }
    )
  }

  $:digits = Array.from(Array(base).keys()).map(d => d.toString(base).toUpperCase())
  $:factors = Array(places).fill(0).map((_, i) => Math.pow(base, i))
</script>

<main style="--dial-width:{DIAL_WIDTH}px">
	<h3>{label} Odometer</h3>
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

      <div class="pointer left">▶</div>
      <div class="pointer right">◀</div>
    </div>
  </div>
  <div class="places-container">
    {#each factors as factor, i}
      <div class="place">{factor}</div>
    {/each}
  </div>

	<br/>

	<div><b>{label} Value:</b> {value.toString(base).toUpperCase()}</div>
  {#if showDecimalValue}
    <div>(<b>Decimal Value:</b> {value.toString()})</div>
  {/if}

	<div>
    <button on:click={() => value ++}>Increment Value</button>
  </div>
</main>

<style>
	main {
    text-align: center;
	}

  .odometer {
    display: flex;
    flex-direction: row-reverse;

    position: relative;
    border: 3px solid gray;
    box-shadow: inset 0px 10px 10px #555, inset 0px -10px 10px #555;
  }
  .odometer-container {
    display: flex;
    justify-content: center;
  }

  .pointer {
    color: red;
    position: absolute;
    top: 50%;
  }
  .left {
    left: -2px;
    transform: translate(-100%, -50%);
  }
  .right {
    right: -3px;
    transform: translate(100%, -50%);
  }

  .place {
    color: gray;
    font-weight: bold;
    width: var(--dial-width);
  }
  .places-container {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
  }

  button {
    margin-top: 0.5em;
  }
</style>
