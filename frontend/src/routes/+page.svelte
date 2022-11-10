<script lang="ts">
	import { page } from '$app/stores'
	import { paginatedPosts, category, currentPage } from '$lib/stores'

	import type { PostType, CategoryType } from '$lib/types'

	import UploadModal from '$lib/components/UploadModal.svelte'
	import Foto from '$lib/components/Foto.svelte'
	import UploadButton from '$lib/components/UploadButton.svelte'
	import Pagination from '$lib/components/Pagination.svelte'
	import Filters from '$lib/components/Filters.svelte'

	$: $page.url.searchParams.set('page', `${$currentPage}`)

	$paginatedPosts = $page.data.paginatedPosts
	$category = $page.data.categories[0]

	let categories: CategoryType[] = $page.data.categories

	let showModal = false
	let scrollToY = 0

	function newPost(event: { detail: PostType }) {
		// TODO: remove n posts from bottom and somehow update paginantion ?
		const post = event.detail
		$paginatedPosts.results = [post, ...$paginatedPosts.results]
	}

	function newPage() {
		scrollToY = 0
	}
</script>

<svelte:window bind:scrollY={scrollToY} />

{#if showModal}
	<UploadModal bind:showModal on:newPost={newPost} />
{/if}

<section class="mt-10">
	<h1 class="text-3xl">Galerie</h1>
</section>

<section class="mt-10 flex justify-end">
	<UploadButton bind:showModal />
</section>

<section class="mt-10">
	<Filters {categories} />
</section>

<section class="mt-10">
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		{#each $paginatedPosts.results as post (post.id)}
			<Foto {post} />
		{/each}
	</div>
</section>

<Pagination on:newPage={newPage} />
