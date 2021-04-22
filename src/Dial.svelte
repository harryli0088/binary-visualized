<script lang="ts">
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import { DIAL_HEIGHT, DIAL_WIDTH } from './utils/constants'
	import getPlaceValue from "./utils/getPlaceValue"

	export let base: number = 10
	export let digits: string[] = []
	export let setValue: (difference: number) => void = () => {}
	export let value: number = 0 //the value tracked by this dial

	$: numDigits = digits.length

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

	const myValue = tweened(value, {
    duration: 500,
    easing: cubicOut
  })

	let startClientY: number = -1
	const dialIsMoving = () => startClientY >= 0

	let startValue: number = -1
	function handleMousedown(e) {
		startDial(e.clientY)
	}
	function handleTouchstart(e) {
    e.preventDefault()
    startDial(e.touches[0].clientY)
  }
	function startDial(clientY: number) {
		//record info to start changing this dial
		startClientY = clientY
		startValue = $myValue
	}

	function handleMousemove(e) {
		moveDial(e.clientY)
	}
  function handleTouchmove(e) {
    if(dialIsMoving()) { //if we should move
      e.preventDefault()
      moveDial(e.touches[0].clientY)
    }
  }
	function moveDial(clientY: number) {
		if(dialIsMoving()) { //if we are changing this dial
			myValue.set(startValue + 1.2*(startClientY - clientY) / DIAL_HEIGHT, {duration: 0})
		}
	}

	function handleDialEnd(e) {
		if(dialIsMoving()) { //if we are done changing this dial
			myValue.set(Math.round($myValue)) //force the dial to the closest integer
			setValue($myValue - startValue) //pass the difference to the set value prop

			//mark that we are done changing this dial
			startClientY = -1
			startValue = -1
		}
	}

	$: getTopvalue = (index: number, isAbove: boolean) => {
		let logicalValue = (index - $myValue) % numDigits

		//we duplicate the values because in the case of binary
		//if the selected value is 0, we want to see 1s above and below
		if(isAbove) { //in the case of binad
			logicalValue += numDigits
		}

		//if this digit is too far ahead, wrap it to the back
		if(logicalValue > numDigits) {
			logicalValue -= 2*numDigits
		}

		return logicalValue * DIAL_HEIGHT + DIAL_HEIGHT/2
	}
	$: getDialClass = (index: number) => {
		let className = 'dial-value'
		if(index === 0) className += ' top-bound'
		if(index === numDigits-1) className += ' bottom-bound'
		return className
	}
</script>

<main style="--dial-width:{DIAL_WIDTH}px;--dial-height:{DIAL_HEIGHT}px">
	<div
		class="dial-container"
		on:mousedown={handleMousedown}
		on:mousemove={handleMousemove}
		on:mouseleave={handleDialEnd}
		on:mouseout={handleDialEnd}
		on:mouseup={handleDialEnd}
		on:touchstart={handleTouchstart}
    on:touchmove={handleTouchmove}
    on:touchend={handleDialEnd}
	>
		{#each digits as d, i}
			<div class={getDialClass(i)} style={`top:${getTopvalue(i, false)}px;`}>{d}</div>
			<div class={getDialClass(i)} style={`top:${getTopvalue(i, true)}px;`}>{d}</div>
		{/each}
	</div>
</main>

<style>
	main {
	}

	.dial-container {
		position: relative;

		border: 1px solid gray;
		cursor: pointer;
		height: calc(2 * var(--dial-height));
		overflow-y: hidden;
		width: var(--dial-width);
	}

	.dial-value {
		display: flex;
		align-items: center;
		justify-content: center;

		position: absolute;
		left: 0;

		border-bottom: 1px solid #ddd;
		border-top: 1px solid #ddd;
		font-weight: bold;
		height: var(--dial-height);
		user-select: none;
		text-align: center;
		width: 100%;
	}
	.top-bound {
		border-top-color: #EC7063;
	}
	.bottom-bound {
		border-bottom-color: #EC7063;
	}
 </style>
