<script lang="ts">
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import getPlaceValue from "./utils/getPlaceValue"
	import roundToNearest from "./utils/roundToNearest"

	export let base: number = 10
	export let digits: number[] = []
	export let factor: number = 1
	export let value: number = 0

	let prevValue = value //track the previous value
	$: {
		if(prevValue !== value) { //if the value changed
			myValue.set( //update my value
				Math.floor(value / factor), //force the value into an integer
				(
					//if the place values are the same, set myValue without any duration
					//this prevents undesired animation when a higher magnitude dial changes
					getPlaceValue(prevValue, factor, base) === getPlaceValue(value, factor, base)
					? {duration: 0} : undefined
				)
			)
		}
    prevValue = value //set the new previous value
  }

	const myValue = tweened(0, {
    duration: 500,
    easing: cubicOut
  })

	let startClientY: number = -1
	let startValue: number = -1
	function handleMousedown(e) {
		startClientY = e.clientY
		startValue = $myValue
	}
	function handleMousemove(e) {
		if(startClientY >= 0) {
			myValue.set(startValue + (startClientY - e.clientY) / 50, {duration: 0})
		}
	}
	function handleMouseExit(e) {
		if(startClientY >= 0) {
			myValue.set(Math.round($myValue))
			const difference = roundToNearest(factor*($myValue - startValue), factor)
			value += difference
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

		return logicalValue * 50 + 25
	}
</script>

<main>
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
		width: 50px;
	}

	.dial-value {
		display: flex;
		align-items: center;
		justify-content: center;

		position: absolute;
		left: 0;

		border-bottom: 1px solid #ccc;
		font-weight: bold;
		height: 50px;
		text-align: center;
		width: 100%;
	}
</style>
