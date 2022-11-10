<script lang="ts">
	import type { PostType } from '$lib/types'
	import Foto from '$lib/components/Foto.svelte'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import { goto, afterNavigate } from '$app/navigation'
	import { base } from '$app/paths'

	export let data: PageData
	const post: PostType = data.post

	let previousPage: string = base
	afterNavigate(({ from }) => {
		console.log(from)
		previousPage = from?.url.href || previousPage
	})
</script>

<button
	on:click={() => goto(previousPage)}
	class="rounded-full border border-stone-600 p-2 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
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
		<line x1="5" y1="12" x2="19" y2="12" />
		<line x1="5" y1="12" x2="11" y2="18" />
		<line x1="5" y1="12" x2="11" y2="6" />
	</svg>
</button>

<section class="mt-10">
	<Foto {post} isLink={false} />
</section>

{#if post.user.username == $page.data.user.username}
	eigenes foto
{/if}
