<script lang="ts">
	import type { PaginatedPostsType } from '$lib/types'
	import { createEventDispatcher } from 'svelte'
	import { paginatedPosts, category } from '$lib/stores'

	let currentPage = 1 // TODO: this should also be a store

	const dispatch = createEventDispatcher()

	async function getPage(page: number | null) {
		if (!page) return
		const response = await fetch(`/api/posts?page=${page}&category=${$category.id}`)

		if (response.ok) {
			const postsResponse: PaginatedPostsType = await response.json()
			$paginatedPosts = postsResponse
			currentPage = postsResponse.current
			dispatch('newPage')
		}
	}
</script>

<section class="mt-10 flex justify-center gap-2">
	<button
		disabled={$paginatedPosts.previous == null}
		on:click={() => getPage($paginatedPosts.previous)}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			class:stroke-stone-300={$paginatedPosts.previous == null}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<polyline points="15 6 9 12 15 18" />
		</svg></button
	>
	{currentPage}
	<button disabled={$paginatedPosts.next == null} on:click={() => getPage($paginatedPosts.next)}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			class:stroke-stone-300={$paginatedPosts.next == null}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<polyline points="9 6 15 12 9 18" />
		</svg></button
	>
</section>
