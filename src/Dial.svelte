<script lang="ts">
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import getPlaceValue from "./utils/getPlaceValue"

	export let base: number = 10
	export let digits: number[] = []
	export let setValue: (difference: number) => void = () => {}
	export let value: number = 0 //the value tracked by this dial

	let prevValue = value //track the previous value
	$: {
		if(prevValue !== value) { //if the value changed
			myValue.set( //update my value
				value,
				(
					//if the place values are the same, set myValue without any duration
					//this prevents undesired animation when a higher magnitude dial changes
					getPlaceValue(prevValue, 1, base) === getPlaceValue(value, 1, base)
					? {duration: 0} : undefined
				)
			)
		}
    prevValue = value //set the new previous value
  }

	const DIAL_HEIGHT = 50
	const DIAL_WIDTH = 50
	const myValue = tweened(value, {
    duration: 500,
    easing: cubicOut
  })

	let startClientY: number = -1
	let startValue: number = -1
	function handleMousedown(e) {
		//record info to start changing this dial
		startClientY = e.clientY
		startValue = $myValue
	}
	function handleMousemove(e) {
		if(startClientY >= 0) { //if we are changing this dial
			myValue.set(startValue + (startClientY - e.clientY) / DIAL_HEIGHT, {duration: 0})
		}
	}
	function handleMouseExit(e) {
		if(startClientY >= 0) { //if we are done changing this dial
			myValue.set(Math.round($myValue)) //force the dial to the closest integer
			setValue($myValue - startValue) //pass the difference to the set value prop

			//mark that we are done changing this dial
			startClientY = -1
			startValue = -1
		}
	}

	$: getTopvalue = (index: number, isAbove: boolean) => {
		let logicalValue = (index - $myValue) % digits.length

		//we duplicate the values because in the case of binary
		//if the selected value is 0, we want to see 1s above and below
		if(isAbove) { //in the case of binad
			logicalValue += digits.length
		}

		//if this digit is too far ahead, wrap it to the back
		if(logicalValue > digits.length) {
			logicalValue -= 2*digits.length
		}

		return logicalValue * DIAL_HEIGHT + DIAL_HEIGHT/2
	}
</script>

<main style="--dial-width:{DIAL_WIDTH}px;--dial-height:{DIAL_HEIGHT}px">
	<div
		class="dial-container"
		on:mousedown={handleMousedown}
		on:mousemove={handleMousemove}
		on:mouseleave={handleMouseExit}
		on:mouseup={handleMouseExit}
	>
		{#each digits as d, i}
			<div class="dial-value" style={`top:${getTopvalue(i, false)}px;`}>{d}</div>
			<div class="dial-value" style={`top:${getTopvalue(i, true)}px;`}>{d}</div>
		{/each}
	</div>
</main>

<style>
	main {
	}

	.dial-container {
		border: 1px solid gray;
		position: relative;
		overflow-y: hidden;
		height: 100px;
		width: var(--dial-width);
	}

	.dial-value {
		display: flex;
		align-items: center;
		justify-content: center;

		position: absolute;
		left: 0;

		border-bottom: 1px solid #ccc;
		font-weight: bold;
		height: var(--dial-height);
		text-align: center;
		width: 100%;
	}
</style>
