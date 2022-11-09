<script lang="ts">
	import type { PostType } from '$lib/types'
	import { fly } from 'svelte/transition'
	import { browserWidth } from '$lib/stores'
	import { onMount } from 'svelte'

	export let post: PostType
	export let isLink = true

	console.log(post)

	let imageWidth: string

	function getImageWidth() {
		if ($browserWidth > 1200) return isLink ? 600 : 1200
		if ($browserWidth > 1100) return isLink ? 500 : 1100
		if ($browserWidth > 1024) return isLink ? 500 : 1000
		if ($browserWidth > 900) return 900
		if ($browserWidth > 800) return 800
		if ($browserWidth > 700) return 700
		if ($browserWidth > 600) return 600
		if ($browserWidth > 500) return 500
		if ($browserWidth > 400) return 400
		if ($browserWidth > 300) return 300
		if ($browserWidth > 200) return 200
		if ($browserWidth > 100) return 100
		return '100'
	}

	onMount(() => {
		imageWidth = getImageWidth().toString()
	})
</script>

{#if isLink}
	<article in:fly class="w-full">
		<a href="media/{post.id}">
			<img
				src={'http://localhost:8000' + post.picture.ratios['1/1'].sources['image/webp'][imageWidth]}
				alt="Foto von {post.user.username}"
			/>
		</a>
	</article>
{:else}
	<article in:fly class="w-full overflow-y-auto">
		<img
			src={'http://localhost:8000' + post.picture.ratios['null'].sources['image/webp'][imageWidth]}
			alt="Foto von {post.user.username}"
		/>
	</article>
{/if}
