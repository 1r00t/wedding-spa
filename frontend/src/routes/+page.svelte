<script lang="ts">
	import { page } from '$app/stores'
	import type { PaginatedPosts, Post } from '$lib/types'

	import UploadModal from './UploadModal.svelte'
	import Foto from './Foto.svelte'
	import UploadButton from './UploadButton.svelte'
	import Pagination from './Pagination.svelte'

	const paginatedPosts: PaginatedPosts = $page.data.posts
	console.log(paginatedPosts)
	let posts = paginatedPosts.results

	let showModal = false

	let currentPage = 1

	function newPost(event: { detail: Post }) {
		const post = event.detail
		posts = [post, ...posts]
	}
</script>

<!-- modal -->
{#if showModal}
	<UploadModal bind:showModal token={$page.data.accessToken} on:newPost={newPost} />
{/if}
<!-- end modal -->

<section class="mt-10">
	<h1 class="text-3xl">Galerie</h1>
</section>

<section class="mt-10 flex justify-end">
	<UploadButton bind:showModal />
</section>

<section class="mt-10">filters</section>

<section class="mt-10">
	<div class="grid grid-cols-1 gap-4">
		{#each posts as post}
			<Foto {post} />
		{/each}
	</div>
</section>

{#if paginatedPosts.next}
	<!-- wie am besten ? -->
	<!-- <Pagination bind:paginatedPosts bind:currentPage /> -->
{/if}
