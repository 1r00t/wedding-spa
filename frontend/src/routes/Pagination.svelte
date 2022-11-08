<script lang="ts">
	import type { PaginationType, PostType, PostsResponseType } from '$lib/types'

	export let posts: PostType[]
	export let currentPage: number
	export let pagination: PaginationType

	async function getPage(page: number | null) {
		if (!page) return
		const response = await fetch(`/api/posts?page=${page}`)

		if (response.ok) {
			const postsResponse: PostsResponseType = await response.json()
			posts = postsResponse.results
			currentPage = postsResponse.current
			pagination = {
				count: postsResponse.count,
				next: postsResponse.next,
				current: postsResponse.current,
				previous: postsResponse.previous
			}
		}
	}
</script>

<section class="mt-10 flex justify-center gap-2">
	{#if pagination.previous}
		<button on:click={() => getPage(pagination.previous)}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-chevron-left"
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
	{/if}
	{currentPage}
	{#if pagination.next}
		<button on:click={() => getPage(pagination.next)}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-chevron-right"
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
	{/if}
</section>
