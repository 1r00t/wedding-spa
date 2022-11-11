<script lang="ts">
	import { page } from '$app/stores'

	import Foto from '$lib/components/Foto.svelte'
	import ChevLeft from '$lib/components/icons/ChevLeft.svelte'
	import ChevRight from '$lib/components/icons/ChevRight.svelte'
	import UploadModal from '$lib/components/UploadModal.svelte'
	import UploadButton from '$lib/components/UploadButton.svelte'
	import { afterNavigate, goto } from '$app/navigation'
	import { onMount } from 'svelte'

	let posts = $page.data.posts
	let pageNext = $page.data.next
	let pagePrevious = $page.data.previous
	let pageCurrent = $page.data.current
	let resultCount = Math.ceil($page.data.count / 100)

	let showModal = false

	let scrollY = 0

	async function getPage(page: number) {
		const response = await fetch('api/posts?page=' + page)
		if (response.ok) {
			const json = await response.json()
			posts = json.posts
			pageNext = json.next
			pagePrevious = json.previous
			pageCurrent = json.current
		}
	}

	afterNavigate(({ from }) => {
		console.log(from)
		if (from?.routeId === '/[id]') {
			const postId = from?.params?.id as string
			scrollY = document.getElementById(postId)?.scrollTop

			// TODO continue
		}
	})
</script>

<svelte:window bind:scrollY />

<!-- MODAL -->
{#if showModal}
	<UploadModal bind:showModal />
{/if}

<!-- TITLE -->
<section class="mt-10 text-center">
	<h2 class="text-4xl">Hochzeitsbilder</h2>
</section>

<!-- UPLOAD BUTTON -->
<section class="mt-20 flex justify-end">
	<UploadButton bind:showModal />
</section>

<!-- FOTOS -->
<section class="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
	{#each posts as post (post.id)}
		<article id={post.id} class="overflow-hidden rounded-md">
			<a href="/{post.id}">
				<Foto {post} ratio={'1/1'} />
			</a>
		</article>
	{/each}
</section>

<!-- PAGINATION -->
<section class="mt-10 flex items-center justify-center space-x-4">
	<button
		class="disabled:text-stone-300"
		disabled={pagePrevious === null}
		on:click={() => getPage(pagePrevious)}><ChevLeft /></button
	>
	<span>{pageCurrent}</span><span class="text-stone-400">/</span><span class="text-stone-400"
		>{resultCount}</span
	>
	<button
		class="disabled:text-stone-300"
		disabled={pageNext === null}
		on:click={() => getPage(pageNext)}><ChevRight /></button
	>
</section>
