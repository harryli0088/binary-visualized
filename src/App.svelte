<script lang="ts">
	import Odometer from './Odometer.svelte';

	const now = new Date()
</script>

<main>
	<h1>Counting in Binary - Visualized</h1>
	<section>
		<p>Learning how to count in binary can seem tricky and daunting, but is actually quite straightforward!</p>
		<p>On a daily basis, you probably use a "base ten" counting system, ie</p>
		<ul>
			<li>I have $100</li>
			<li>I am 30-years-old</li>
			<li>This year is {now.getFullYear()}</li>
		</ul>
		<p>"Base ten" simply means that we have ten symbols available to use for counting, ie 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. When we get to the number "ten", we don't have a special symbol. Instead, we combine two symbols "1" and "0" to represent the number 10.</p>
		<p>Simple 09 to 10 example</p>
		<Odometer base={10} places={4}/>
		<p>Notice that when we ran out of symbols in the "ones" place, we incremented the symbol in the "tens" place from 0 to 1. We also reset the symbol in the ones place from 9 to 0</p>
	</section>

	<section>
		<h2>What is Binary</h2>
		<p>Binary is a counting system that only has two symbols - 0 and 1 - which in electronics and computing represent low and high voltage. Unlike our day-to-day base ten system which has ten symbols, binary, aka base two, only has 0 and 1</p>
	</section>
</main>

<style>
	main {
	}
</style>
