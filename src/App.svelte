<script lang="ts">
	import NumberAndLabel from './NumberAndLabel.svelte';
	import Odometer from './Odometer.svelte';

	const now = new Date()
	let globalValue: number = 1234
	$:globalValueString = globalValue.toString()
</script>

<main>
	<header>
		<h1>Counting in Binary - Visualized</h1>
		<div>
			<a href="https://github.com/harryli0088/binary-visualized" target="_blank" rel="noopener noreferrer"><img src="img/github.svg" alt="github logo"/></a>
		</div>
	</header>

	<section>
		<p>Counting in binary can seem tricky but is actually quite straightforward!</p>
		<p>On a daily basis, we use a <b>base-ten</b> counting system, ie</p>
		<ul>
			<li>I have $20</li>
			<li>I am 35-years-old</li>
			<li>This year is {now.getFullYear()}</li>
		</ul>
		<p><b>Base-ten</b> (aka <b>decimal</b>) simply means that we have ten symbols available to use for counting, ie 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. When we get to the number <b>ten</b>, we don't have a dedicated symbol. Instead, we combine two symbols <b>1</b> and <b>0</b> to represent the number <b>10</b>.</p>
		<p>Here is an odometer, which uses rotating dials to represent a multi-digit number. Try rotating the right-most dial and see how it behaves! What happens when you increment from nine to ten?</p>
		<Odometer base={10} initialValue={0} label="Value" places={2} showBaseTenValue={false}/>
		<p>When we ran out of symbols in the <b>ones</b> place, we incremented the symbol in the <b>tens</b> place from 0 to 1. We also made a full revolution in the ones place from 9 back to 0.</p>
		<Odometer base={10} initialValue={globalValue} label="Value" places={4} showBaseTenValue={false} bind:value={globalValue}/>
		<p>Notice that in base-ten, each subsequent dial on the left represents a higher power of ten. In this case, the number <b>{globalValue}</b> represents <NumberAndLabel label="thousand" value={globalValueString[0]}/>, <NumberAndLabel label="hundred" value={globalValueString[1]}/>, <NumberAndLabel label="ten" value={globalValueString[2]}/>, and <NumberAndLabel label="one" value={globalValueString[3]}/>. Instead of coming up with an infinite number of symbols to represent every single number (❄︎, 🍕, ﬗ, <span style="font-size: 1.5em">🦝</span>, ...), we only use ten. When we run out of symbols in one place, we increment the symbol in the next place.</p>
	</section>

	<section>
		<h2>What is Binary?</h2>
		<p>Unlike our day-to-day base-ten counting system, base-two (aka <b>binary</b>) only has two symbols - 0 and 1 - which are useful in electronics to represent low and high voltage. At first, binary seems a little funny compared to what we're used to. For example, the number 9 is represented in binary as <b>1001</b>. This is because binary only has two symbols and has to start using its higher dials much earlier.</p>
		<Odometer base={2} initialValue={0} places={5}/>
		<p>In decimal / base-ten, each subsequent place represents a higher power of ten. Similarly, in binary, each subsequent place represents a higher power of two. When converting from binary to decimal, you can simply add the powers of 2. Here are some examples:</p>
		<ul>
			<li><b>1</b> in binary converts to <b>1</b> in decimal</li>
			<li><b>10</b> in binary converts to <b>2</b> in decimal</li>
			<li><b>11</b> in binary converts to 2 + 1 = <b>3</b> in decimal</li>
			<li><b>101</b> in binary converts to 4 + 1 = <b>5</b> in decimal</li>
			<li><b>1111</b> in binary converts to 8 + 4 + 2 + 1 = <b>15</b> in decimal</li>
		</ul>
	</section>

	<section>
		<h2>Other Counting Systems</h2>
		<p>In theory, you could arbitrarily decide to count in any base you wanted, say base-twenty seven million. In practice, there are only two other commonly used counting systems. The first is base-eight (aka <b>octal</b>):</p>
		<Odometer base={8} initialValue={0} places={4}/>

		<p>The second is base-sixteen (aka <b>hexadecimal</b>), which uses symbols A, B, C, D, E and F to represent values 10, 11, 12, 14, and 15:</p>
		<Odometer base={16} initialValue={43981} places={4}/>
	</section>

	<section>
		<h2>Closing Thoughts</h2>
		<p>I had trouble learning binary at first because I had been so used to counting in decimal. In my mind, base-ten was the <i>only</i> base; there was just no other way to count. It was difficult to let go of my limited perspective and instead see that base-ten is just one of many counting systems. To me, the most important part of learning binary is learning how to generalize a narrow perspective into broader understanding.</p>
	</section>

	<footer>
		<p>Built using <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">Svelte</a> and <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">Typescript</a></p>
		<p>Github Repo: <a href="https://github.com/harryli0088/binary-visualized" target="_blank" rel="noopener noreferrer">https://github.com/harryli0088/binary-visualized</a></p>
	</footer>
</main>

<style>
	main {
	}

	header, section, footer {
		padding: 1em;
	}
	@media only screen and (min-width: 600px) {
		header, section, footer {
			padding-left: calc(50vw - 300px + 1em);
			padding-right: calc(50vw - 300px + 1em);
		}
	}
	@media only screen and (min-width: 1000px) {
		header, section, footer {
			padding-left: calc(50vw - 400px);
			padding-right: calc(50vw - 400px);
		}
	}

	header {
		height: 70vh;
		background-color: #ddd;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	header a img {
		width: 2em;
		height: 2em;
		transition: 0.5s;
	}
	header a img:hover {
		transform: scale(1.25);
	}

	footer {
		background-color: #ddd;
	}
</style>
