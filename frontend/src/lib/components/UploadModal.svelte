<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition'
	import { clickOutside } from '$lib/helpers'
	import { createEventDispatcher } from 'svelte'

	import { page } from '$app/stores'

	const dispatch = createEventDispatcher()

	export let showModal

	let loading = false

	let allFilesCount = 0
	let imageFileCount = 0
	let videoFileCount = 0
	let fileInputEl: HTMLInputElement
	let imageFiles: File[] = []
	let videoFiles: File[] = []
	let loadedImages = 0

	$: if (imageFileCount > 0 && loadedImages == imageFileCount) {
		showModal = false
		loading = false
	}

	const controller = new AbortController()
	const signal = controller.signal

	function inputChange() {
		const files = fileInputEl.files
		if (files?.length) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				if (file.type.startsWith('image')) {
					imageFiles = [...imageFiles, file]
				} else if (file.type.startsWith('video')) {
					videoFiles = [...videoFiles, file]
				}
			}
		}
		imageFileCount = imageFiles.length
		videoFileCount = videoFiles.length
		allFilesCount = imageFileCount + videoFileCount
	}

	async function uploadData() {
		if (!imageFileCount && !videoFileCount) return

		loading = true

		imageFiles.forEach(async (file) => {
			let formData = new FormData()
			formData.append('picture', file)
			const response = await fetch('https://backend.brandts.wedding/posts/create/', {
				headers: {
					'X-USERNAME': $page.data.user.username
				},
				method: 'POST',
				body: formData,
				signal: signal
			})
			if (response.ok) {
				const post = await response.json()
				loadedImages += 1
				dispatch('newPost', post)
			} else {
				console.error(response.status, response.statusText)
			}
		})
	}
</script>

<div
	class="fixed inset-0 z-20 flex items-center justify-center bg-stone-600/80 backdrop-blur-lg"
	transition:fade={{ duration: 150 }}
>
	<div
		class="flex h-96 w-full max-w-xs flex-col rounded-md bg-stone-50 shadow-lg"
		in:slide={{ delay: 300 }}
		use:clickOutside
		on:click_outside={() => (showModal = false)}
	>
		<div class="flex items-center justify-between px-4 py-2 text-xl">
			<h4 class="">Dateien auswählen</h4>
			<button
				class="rounded-full bg-red-400 p-0.5 text-red-50 transition-all duration-75 hover:bg-red-600 hover:text-stone-50 hover:shadow-md"
				on:click={() => {
					showModal = false
					controller.abort()
				}}
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
				{#if imageFileCount || videoFileCount}
					<p class="flex flex-col text-center" in:fly>
						{#if imageFileCount}
							<span>
								<strong>{imageFileCount}</strong> Bild{imageFileCount > 1 ? 'er' : ''} ausgewählt
							</span>
						{/if}
						{#if videoFileCount}
							<span>
								<strong>{videoFileCount}</strong> Video{videoFileCount > 1 ? 's' : ''} ausgewählt
							</span>
						{/if}
					</p>
				{/if}
				<p class="mt-10 flex justify-end gap-4">
					<button
						disabled={allFilesCount < 1 || loading}
						on:click={uploadData}
						class="flex items-center space-x-2 rounded-md border border-none bg-emerald-500 px-4 py-2 text-emerald-50 shadow-md transition-all hover:bg-emerald-600 hover:shadow-sm active:translate-y-1 disabled:bg-stone-100 disabled:text-stone-400 disabled:shadow-none disabled:active:translate-y-0"
					>
						<span>hochladen</span>
						{#if loading}
							<svg
								class="animate-spin"
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
								<line x1="12" y1="6" x2="12" y2="3" />
								<line x1="16.25" y1="7.75" x2="18.4" y2="5.6" />
								<line x1="18" y1="12" x2="21" y2="12" />
								<line x1="16.25" y1="16.25" x2="18.4" y2="18.4" />
								<line x1="12" y1="18" x2="12" y2="21" />
								<line x1="7.75" y1="16.25" x2="5.6" y2="18.4" />
								<line x1="6" y1="12" x2="3" y2="12" />
								<line x1="7.75" y1="7.75" x2="5.6" y2="5.6" />
							</svg>
						{/if}
					</button>
				</p>
			</div>
		</div>
	</div>
</div>
