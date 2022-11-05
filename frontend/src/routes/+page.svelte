<script lang="ts">
	import { page } from '$app/stores'
	import type { PaginatedPosts } from '$lib/types'
	import { fade, fly, slide } from 'svelte/transition'
	import { clickOutside } from '$lib/helpers'

	const paginatedPosts: PaginatedPosts = $page.data.posts
	const posts = paginatedPosts.results

	let showModal = false
	let filesSelected = 0
	let fileInputEl: HTMLInputElement

	function inputChange() {
		const files = fileInputEl.files
		if (files?.length) {
			filesSelected = files.length
		}
	}
</script>

<!-- modal -->
{#if showModal}
	<div
		class="absolute inset-0 z-10 flex items-center justify-center bg-stone-600/80 backdrop-blur-lg"
		transition:fade={{ duration: 150 }}
	>
		<div
			class="flex h-80 w-full max-w-xs flex-col rounded-md bg-stone-50 shadow-lg"
			in:slide
			use:clickOutside
			on:click_outside={() => (showModal = false)}
		>
			<div class="flex items-center justify-between px-4 py-2 text-xl">
				<h4 class="">Dateien auswählen</h4>
				<button
					class="rounded-full bg-red-400 p-0.5 text-red-50 transition-all duration-75 hover:bg-red-600 hover:text-stone-50 hover:shadow-md"
					on:click={() => (showModal = false)}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg></button
				>
			</div>
			<hr />
			<div class="mt-4 flex h-full w-full flex-col justify-between px-4 pb-4">
				<label for="files">
					<input
						type="file"
						id="files"
						name="files"
						accept="image/*,video/*"
						multiple
						class="hidden"
						bind:this={fileInputEl}
						on:change={inputChange}
					/>
					<div
						class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-stone-500 py-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="48"
							height="48"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
							<polyline points="9 15 12 12 15 15" />
							<line x1="12" y1="12" x2="12" y2="21" />
						</svg>
						<span> hier clicken </span>
					</div>
				</label>

				<div>
					{#if filesSelected}
						<p class="text-center" in:fly>
							<strong>{filesSelected}</strong> Datei{filesSelected > 1 ? 'en' : ''} ausgewählt
						</p>
					{/if}
					<p class="mt-10 flex justify-end gap-4">
						<button
							disabled={filesSelected < 1}
							class="rounded-md border border-none bg-emerald-500 px-4 py-2 text-emerald-50 shadow-md transition-all hover:bg-emerald-600 hover:shadow-sm active:translate-y-1 disabled:bg-stone-100 disabled:text-stone-400 disabled:shadow-none disabled:active:translate-y-0"
							>hochladen</button
						>
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
<!-- end modal -->

<section class="mt-10">
	<h1 class="text-3xl">Galerie</h1>
</section>

<section class="mt-10 flex justify-end">
	<button
		on:click={() => (showModal = true)}
		class="flex items-center gap-2 rounded-full border border-stone-600 bg-stone-50 py-2 px-4 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-upload"
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
			<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
			<polyline points="7 9 12 4 17 9" />
			<line x1="12" y1="4" x2="12" y2="16" />
		</svg>
		<span>hochladen</span></button
	>
</section>

<section class="mt-10">filters</section>
<section class="mt-10">
	<div class="grid grid-cols-1 gap-4">
		{#each posts as post}
			<article>
				<a href="media/{post.id}">
					<img src={post.foto} alt="foto von {post.user.username}" />
				</a>
			</article>
		{/each}
	</div>
</section>
