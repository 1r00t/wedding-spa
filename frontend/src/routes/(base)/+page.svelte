<script lang="ts">
	import { page } from '$app/stores'
	import { posts, count, current, next, previous, categoryId } from '$lib/stores'

	import Foto from '$lib/components/Foto.svelte'
	import UploadModal from '$lib/components/UploadModal.svelte'
	import UploadButton from '$lib/components/UploadButton.svelte'
	import Filters from '$lib/components/Filters.svelte'

	$posts = $page.data.posts
	$next = $page.data.next
	$previous = $page.data.previous
	$current = $page.data.current
	$count = $page.data.count

	if ($categoryId > 1) {
		$posts = $posts.filter((post) => post.category.id == $categoryId)
	}

	let categories = $page.data.categories

	let showModal = false
</script>

<!-- MODAL -->
{#if showModal}
	<UploadModal bind:showModal />
{/if}

<!-- TITLE -->
<section class="mt-10 text-center">
	<h2 class="text-4xl">Hochzeitsbilder</h2>
</section>

<!-- FILTER + UPLOAD BUTTON -->
<section class="mt-20 flex flex-col items-end justify-end gap-4 sm:flex-row">
	<div class="sm:order-last">
		<UploadButton bind:showModal />
	</div>
	<div class="sm:order-first">
		<Filters {categories} />
	</div>
</section>

<!-- FOTOS -->
<section class="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
	{#each $posts as post (post.id)}
		<article id={post.id} class="aspect-square overflow-hidden rounded-md">
			<a href="/{post.id}">
				<Foto {post} ratio={'1/1'} />
			</a>
		</article>
	{/each}
</section>
