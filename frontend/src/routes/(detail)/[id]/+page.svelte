<script lang="ts">
	import Foto from '$lib/components/Foto.svelte'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import type { PostType } from '$lib/types'

	import Download from '$lib/components/icons/Download.svelte'
	import Delete from '$lib/components/icons/Delete.svelte'
	import Maximize from '$lib/components/icons/Maximize.svelte'
	import BackArrow from '$lib/components/icons/BackArrow.svelte'

	const post: PostType = $page.data.post

	function submitForm(e: MouseEvent) {
		if (!confirm('Wirklich löschen?')) {
			e.preventDefault()
		}
	}
</script>

<section class="mx-auto mt-10 flex max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
	<a
		href={`/#${post.id}`}
		data-sveltekit-prefetch
		class="rounded-full border border-stone-600 bg-stone-50 p-2 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
	>
		<BackArrow />
	</a>
</section>

<section
	class="mx-auto mt-10 flex max-w-md justify-center sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
>
	<div class="relative">
		<Foto {post} ratio={'4/3'} />
		<span class="absolute bottom-0 right-1 text-xs text-stone-50">&#169;{post.user.username}</span>
	</div>
</section>

<section class="mx-auto mt-4 flex max-w-md items-center justify-between px-10">
	<div>
		<p>{post.category.name}</p>
	</div>
	<div class="flex justify-end space-x-2">
		<a
			href={post.picture.url}
			title="Original anzeigen"
			class="flex items-center gap-2 rounded-full border border-stone-600 bg-stone-50 p-2 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
		>
			<Maximize />
		</a>
		<a
			class="flex items-center gap-2 rounded-full border border-stone-600 bg-stone-50 p-2 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
			href={post.picture.url}
			title="herunterladen"
			download=""
		>
			<Download />
		</a>
		{#if post.user.username === $page.data.user.username}
			<form action="?/delete" method="POST" use:enhance>
				<input type="hidden" name="id" value={post.id} />
				<button
					on:click={submitForm}
					type="submit"
					title="löschen"
					class="flex items-center rounded-full border border-rose-600 bg-stone-50 p-2 text-rose-600 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
				>
					<Delete />
				</button>
			</form>
		{/if}
	</div>
</section>
