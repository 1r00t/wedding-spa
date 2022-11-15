<script lang="ts">
	import { posts, count, current, next, previous, categoryId, categories } from '$lib/stores'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let selectedCategoryId: number = $categoryId

	async function getPosts() {
		const response = await fetch(`/api/posts?page=1&category=${selectedCategoryId}`)
		if (response.ok) {
			const postsResponse = await response.json()
			$posts = postsResponse.posts
			$count = postsResponse.count
			$current = postsResponse.current
			$next = postsResponse.next
			$previous = postsResponse.previous
			$categoryId = selectedCategoryId
			dispatch('newPage')
		}
	}

	async function setCategory() {
		await getPosts()
	}
</script>

<select
	name="categories"
	id="categories"
	class="h-12 rounded-full border-stone-600"
	bind:value={selectedCategoryId}
	on:change={setCategory}
>
	{#each $categories as category (category.id)}
		<option value={category.id}>{category.name}</option>
	{/each}
</select>
