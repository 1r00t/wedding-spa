<script lang="ts">
	import type { CategoryType, PaginatedPostsType } from '$lib/types'
	import { category, paginatedPosts } from '$lib/stores'
	import { createEventDispatcher } from 'svelte'

	export let categories: CategoryType[]

	const dispatch = createEventDispatcher()

	let selectedCategoryId: number

	async function getPosts() {
		const response = await fetch(`/api/posts?page=1&category=${$category.id}`)
		if (response.ok) {
			const postsResponse: PaginatedPostsType = await response.json()
			$paginatedPosts = postsResponse
			dispatch('newPage')
		}
	}

	async function setCategory() {
		$category = categories.find((c) => c.id === selectedCategoryId) || categories[0]
		await getPosts()
	}
</script>

<select
	name="categories"
	id="categories"
	class="rounded-full"
	bind:value={selectedCategoryId}
	on:change={setCategory}
>
	{#each categories as category (category.id)}
		<option value={category.id}>{category.name}</option>
	{/each}
</select>
