<script lang="ts">
	import { page } from '$app/stores'
	import { applyAction, enhance } from '$app/forms'
	import { slide } from 'svelte/transition'
	import { onDestroy } from 'svelte'

	import type { PostType } from '$lib/types'
	import { categories } from '$lib/stores'

	import Foto from '$lib/components/Foto.svelte'
	import Download from '$lib/components/icons/Download.svelte'
	import Delete from '$lib/components/icons/Delete.svelte'
	import Maximize from '$lib/components/icons/Maximize.svelte'
	import BackArrow from '$lib/components/icons/BackArrow.svelte'
	import ChevDown from '$lib/components/icons/ChevDown.svelte'

	let post: PostType = $page.data.post
	$categories = $page.data.categories

	let displayedCategory = post.category.name

	let accordionOpen = false
	onDestroy(() => (accordionOpen = false))

	let categoryForm: HTMLFormElement
	let categorySelectEl: HTMLSelectElement

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
<section class="mx-auto mt-10 flex max-w-md items-center justify-between px-10">
	<h3>{displayedCategory}</h3>
	<!-- ORIGINAL SIZE BUTTON -->
	<div class="flex space-x-2">
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
	</div>
</section>

<!-- EDIT -->
{#if post.user.username === $page.data.user.username}
	<section class="mx-auto mt-10 flex max-w-md flex-col px-10">
		<button
			class="flex h-10 items-center justify-between rounded-t-md bg-stone-200 px-4 shadow-md"
			on:click={() => (accordionOpen = !accordionOpen)}
		>
			<span class="text-sm">Kategorie ändern / Foto löschen</span>
			<div class:rotate-180={accordionOpen} class="transition-transform">
				<ChevDown />
			</div>
		</button>

		<!-- ACCORDION -->
		{#if accordionOpen}
			<div
				class="flex items-center justify-center space-x-4 rounded-b-md bg-stone-50 py-4 shadow-md"
				transition:slide|local
			>
				<!-- CATEGORY SELECT -->
				<form
					bind:this={categoryForm}
					on:submit|preventDefault
					action="?/set_category"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							displayedCategory =
								$categories.find((cat) => cat.id.toString() === categorySelectEl.value)?.name || ''
							await applyAction(result)
						}
					}}
				>
					<input type="hidden" name="post_id" id="post_id" value={post.id} />
					<select
						name="category_id"
						id="category_id"
						class="h-12 rounded-full border-stone-600 focus:border-stone-600 focus:shadow-md focus:ring-0"
						on:change={() => categoryForm.requestSubmit()}
						bind:this={categorySelectEl}
					>
						{#each $categories as category}
							<option value={category.id} selected={post.category.id === category.id}
								>{category.name}</option
							>
						{/each}
					</select>
				</form>

				<!-- DELETE BUTTON -->
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
			</div>
		{/if}
	</section>
{/if}
