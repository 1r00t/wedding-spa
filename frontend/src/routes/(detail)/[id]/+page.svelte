<script lang="ts">
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'

	import type { PostType } from '$lib/types'

	import { categories } from '$lib/stores'

	import Foto from '$lib/components/Foto.svelte'

	import Download from '$lib/components/icons/Download.svelte'
	import Delete from '$lib/components/icons/Delete.svelte'
	import Maximize from '$lib/components/icons/Maximize.svelte'
	import BackArrow from '$lib/components/icons/BackArrow.svelte'

	const post: PostType = $page.data.post

	function submitDelete(e: MouseEvent) {
		if (!confirm('Wirklich löschen?')) {
			e.preventDefault()
		}
	}
</script>

<!-- BACK BUTTON -->
<section class="mt-10 flex px-10 ">
	<a
		href={`/#${post.id}`}
		data-sveltekit-prefetch
		class="rounded-full border border-stone-600 bg-stone-50 p-2 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
	>
		<BackArrow />
	</a>
</section>

<!-- FOTO -->
<section
	class="mx-auto mt-10 flex max-w-md justify-center sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
>
	<div class="relative">
		<Foto {post} ratio={'4/3'} />
		<span class="absolute bottom-0 right-1 text-xs text-stone-50">&#169;{post.user.username}</span>
	</div>
</section>

<!-- DETAILS -->
<section class="mx-auto mt-4 flex max-w-md items-center justify-between px-10">
	<div>
		<form action="?/set_category" method="POST" use:enhance>
			<input type="hidden" name="post_id" id="post_id" value={post.id} />
			<select name="categoryId" id="categoryId" class="h-12 rounded-full border-stone-600">
				{#each $categories as category}
					<option value={category.id} selected={post.category.id === category.id}
						>{category.name}</option
					>
				{/each}
			</select>
		</form>
	</div>
	<div class="flex justify-end space-x-2">
		<!-- ORIGINAL SIZE BUTTON -->
		<a
			href={post.picture.url}
			title="Original anzeigen"
			class="flex items-center gap-2 rounded-full border border-stone-600 bg-stone-50 p-2 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
		>
			<Maximize />
		</a>
		<!-- DOWNLOAD BUTTON -->
		<a
			class="flex items-center gap-2 rounded-full border border-stone-600 bg-stone-50 p-2 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
			href={post.picture.url}
			title="herunterladen"
			download=""
		>
			<Download />
		</a>
		<!-- DELETE BUTTON -->
		{#if post.user.username === $page.data.user.username}
			<form action="?/delete" method="POST" use:enhance>
				<input type="hidden" name="id" value={post.id} />
				<button
					on:click={submitDelete}
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
