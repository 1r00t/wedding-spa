<script lang="ts">
	import type { CategoryType } from '$lib/types'
	import { category } from '$lib/stores'

	export let categories: CategoryType[]

	let selectedCategoryId: number

	function selectCategory() {
		$category = categories.find((cat) => cat.id === selectedCategoryId) || categories[0]
	}
</script>

<select
	name="categories"
	id="categories"
	class="rounded-full"
	bind:value={selectedCategoryId}
	on:change={selectCategory}
>
	{#each categories as category (category.id)}
		<option value={category.id}>{category.name}</option>
	{/each}
</select>
