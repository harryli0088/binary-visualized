<script lang="ts">
	import NumberAndLabel from './NumberAndLabel.svelte';
	import Odometer from './Odometer.svelte';

	const now = new Date()
	let globalValue: number = 1234
	$:globalValueString = globalValue.toString()
</script>

<main style="--tablet-padding:calc(50vw - 300px + 1em);--desktop-padding:calc(50vw - 400px)">
	<header>
		<div id="img-container">
			<img src="img/nathan-lindahl-tX9A5DQHDC4-unsplash.jpg" alt="cat"/>
			<div id="source">Photo by <a href="https://unsplash.com/@hip_dinosaur?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nathan Lindahl</a> on <a href="https://unsplash.com/s/photos/dashboard?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></div>
		</div>

		<div id="heading">
			<h1>Binary Visualized</h1>
			<p id="sub-heading">How car odometers can teach us to count in binary</p>
			<div>
				<a href="https://github.com/harryli0088/binary-visualized" target="_blank" rel="noopener noreferrer"><img src="img/github.svg" alt="github logo"/></a>
			</div>
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
		<p><b>Base-ten</b> simply means that we have ten symbols available to use for counting, ie 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. When we get to the number <b>ten</b>, we don't have a dedicated symbol. Instead, we combine two symbols <b>1</b> and <b>0</b> to represent the number <b>10</b>.</p>
		<p>Odometers (like the one in your '95 Toyota Camery) use rotating dials to represent multi-digit numbers. Try rotating the right-most dial and see how it behaves! What happens when you increment from nine to ten?</p>
		<Odometer base={10} initialValue={0} places={2} showDecimalValue={false}/>
		<p>When we ran out of symbols in the <b>ones</b> place, we incremented the symbol in the <b>tens</b> place from 0 to 1. We also made a full revolution in the ones place from 9 back to 0.</p>
		<p>Next let's take a look at the longer odometer below.</p>
		<Odometer base={10} initialValue={globalValue} places={4} showDecimalValue={false} bind:value={globalValue}/>
		<p>Notice that in base-<i>ten</i>, each subsequent dial on the left represents a higher power of <i>ten</i>. In this case, the number <b>{globalValue}</b> represents <NumberAndLabel label="thousand" value={globalValueString[0]}/>, <NumberAndLabel label="hundred" value={globalValueString[1]}/>, <NumberAndLabel label="ten" value={globalValueString[2]}/>, and <NumberAndLabel label="one" value={globalValueString[3]}/>. Instead of coming up with infinite symbols to represent every number (❄︎, 🍕, ﬗ, <span style="font-size: 1.5em">🦝</span>, ...), we only use ten. When we run out of symbols in one place, we increment the symbol in the next place.</p>
	</section>

	<section>
		<h2>What is Binary?</h2>
		<p>Unlike our regular base-ten (aka <b>decimal</b>) counting system, base-two (aka <b>binary</b>) only has two symbols - 0 and 1 - which are useful in electronics to represent low and high voltage. At first, binary seems a little funny compared to what we're used to. For example, the number 9 is represented in binary as <b>1001</b>. This is because binary only has two symbols and has to start using its higher dials much earlier.</p>
		<Odometer base={2} initialValue={0} label="Binary" places={5}/>
		<p>In decimal, each subsequent place represents a higher power of ten. Similarly, in binary, each subsequent place represents a higher power of two. When converting from binary to decimal, you can simply add the powers of 2. Here are some examples:</p>

		<div>
			<table>
				<thead>
					<tr>
						<th>Binary</th>
						<th>Decimal</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td><b>1</b></td>
						<td><b>1</b></td>
					</tr>
					<tr>
						<td><b>10</b></td>
						<td>2 + 0 = <b>2</b></td>
					</tr>
					<tr>
						<td><b>11</b></td>
						<td> 2 + 1 = <b>3</b></td>
					</tr>
					<tr>
						<td><b>100</b></td>
						<td>4 + 0 + 0 = <b>4</b></td>
					</tr>
					<tr>
						<td><b>101</b></td>
						<td> 4 + 0 + 1 = <b>5</b></td>
					</tr>
					<tr>
						<td><b>110</b></td>
						<td> 4 + 2 + 0 = <b>6</b></td>
					</tr>
					<tr>
						<td><b>111</b></td>
						<td> 4 + 2 + 1 = <b>7</b></td>
					</tr>
					<tr>
						<td>...</td>
						<td>...</td>
					</tr>
					<tr>
						<td><b>1111</b></td>
						<td> 8 + 4 + 2 + 1 = <b>15</b></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section>
		<h2>Other Counting Systems</h2>
		<p>In theory, you could arbitrarily decide to count in any base you wanted, say base-twenty seven million. In practice, there are only two other commonly used counting systems. The first is base-eight (aka <b>octal</b>):</p>
		<Odometer base={8} initialValue={0} label="Octal" places={4}/>

		<p>The second is base-sixteen (aka <b>hexadecimal</b>), which uses symbols A, B, C, D, E and F to represent numbers ten to fifteen:</p>
		<Odometer base={16} initialValue={43981} label="Hexadecimal" places={4}/>
	</section>

	<section>
		<h2>Closing Thoughts</h2>
		<p>I had trouble learning binary at first because I had been so used to counting in decimal. In my mind, base-ten was the <i>only</i> base; there was just no other way to count. It was difficult to let go of my limited perspective and instead see that base-ten is just one of many counting systems. To me, the most important part of learning binary is learning how to generalize a narrow perspective into broader understanding.</p>
	</section>

	<footer>
		<p>Built using <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">Svelte</a> and <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">Typescript</a></p>
		<p>Github Repo: <a href="https://github.com/harryli0088/binary-visualized" target="_blank" rel="noopener noreferrer">https://github.com/harryli0088/binary-visualized</a></p>
		<p>Github Logo provided by Font Awesome: <a href="https://fontawesome.com/license" target="_blank" rel="noopener noreferrer">https://fontawesome.com/license</a></p>
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
			padding-left: var(--tablet-padding);
			padding-right: var(--tablet-padding);
		}
	}
	@media only screen and (min-width: 1000px) {
		header, section, footer {
			padding-left: var(--desktop-padding);
			padding-right: var(--desktop-padding);
		}
	}

	header {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background-color: #17202A;
		color: white;
	}
	@media only screen and (min-width: 600px) {
		header {
			height: 50vh;
			flex-direction: row;
		}
	}
	@media only screen and (min-width: 1000px) {
		header {
			height: 70vh;
		}
	}


	/*** start section for heading responsive styling ***/
	#heading {
		text-align: center;
		padding-bottom: 1em;
	}
	@media only screen and (min-width: 600px) {
		#img-container {
			width: 50%;
			padding-right: 1em;
		}
		#heading {
			width: 50%;
			padding: 0;
			padding-left: 1em;
			text-align: left;
		}
	}
	/*** end section ***/

	#img-container img {
		width: 100%;
		box-shadow: 0 0 5px rgba(0,0,0,0.1);
	}

	#source {
		text-align: center;
		font-size: 0.7em;
		font-style: italic;
		color: #bbb;
	}

	#heading h1 {
		line-height: 1.25em;
	}

	#sub-heading {
		font-style: italic;
	}

	#heading a img {
		width: 1.75em;
		height: 1.75em;
		transition: 0.5s;
	}
	#heading a img:hover {
		transform: scale(1.25);
	}

	table {
		margin: auto;
	}

	thead tr {
		background-color: #D6EAF8;
	}

	th {
		text-align: left;
		padding-left: 1em;
		padding-right: 1em;
	}

	tbody tr:nth-child(odd) {
		background-color: #eee;
	}

	td {
		text-align: right;
		padding-left: 1em;
		padding-right: 1em;
		font-family: monospace;
	}

	footer {
		background-color: #ddd;
	}
</style>
