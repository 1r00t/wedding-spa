<script lang="ts">
	import { page } from '$app/stores'
	import { posts, count, current, next, previous, categoryId, categories } from '$lib/stores'

	import Foto from '$lib/components/Foto.svelte'
	import UploadModal from '$lib/components/UploadModal.svelte'
	import UploadButton from '$lib/components/UploadButton.svelte'
	import Filters from '$lib/components/Filters.svelte'
	import { invalidate } from '$app/navigation'

	$posts = $page.data.posts
	$next = $page.data.next
	$previous = $page.data.previous
	$current = $page.data.current
	$count = $page.data.count
	$categories = $page.data.categories

	if ($categoryId > 1) {
		$posts = $posts.filter((post) => post.category.id == $categoryId)
	}

	let showModal = false

	async function reload() {
		await invalidate('app:posts')
		$posts = $page.data.posts
	}
</script>

<!-- MODAL -->
{#if showModal}
	<UploadModal bind:showModal on:newPost={reload} />
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
		<Filters />
	</div>
</section>

<!-- FOTOS -->
<section class="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2" data-sveltekit-prefetch>
	{#each $posts as post (post.id)}
		<article id={post.id} class="aspect-square overflow-hidden rounded-md">
			<a href="/{post.id}">
				<Foto {post} ratio={'1/1'} />
			</a>
		</article>
	{/each}
</section>
