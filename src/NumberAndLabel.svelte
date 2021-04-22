<script lang="ts">
  export let label: string = ""
	export let value: number = 0
</script>

<main>
	<span><b>{value}</b> {label}{value==="1" ? "" : "s"}</span>
</main>

<style>
  main {
    display: inline-block;
  }
</style>
