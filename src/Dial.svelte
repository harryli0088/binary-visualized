<script lang="ts">
	export let digits: number[] = []
	export let value: number = 0

	let lastClientY: number = -1
	function handleMousedown(e) {
		lastClientY = e.clientY
	}
	function handleMousemove(e) {
		if(lastClientY >= 0) {
			value += ( lastClientY - e.clientY ) / 50
			lastClientY = e.clientY
		}
	}
	function handleMouseExit(e) {
		// value = Math.round(value)
		lastClientY = -1
	}

	$: getTopvalue = (index: number, isAbove: boolean) => {
		let logicalValue = (index - value) % digits.length
		if(isAbove) {
			logicalValue += digits.length
		}
		if(logicalValue > digits.length) {
			logicalValue -= 2*digits.length
		}

		return logicalValue * 50 + 50
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
		background-color: pink;
		position: relative;
		overflow-y: hidden;
		height: 150px;
	}

	.dial-value {
		align-items: center;
		display: flex;
		font-weight: bold;
		height: 50px;
		justify-content: center;
		left: 0;
		position: absolute;
	}
</style>
