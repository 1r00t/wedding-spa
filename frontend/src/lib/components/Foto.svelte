<script lang="ts">
	import type { PostType } from '$lib/types'
	import { fly } from 'svelte/transition'
	import { browserWidth } from '$lib/stores'
	import { onMount } from 'svelte'

	export let post: PostType
	export let isLink = true

	// console.log(post)
	// console.log(post.picture.ratios['1/1'].sources['image/webp'])

	const srcset = Object.entries(post.picture.ratios['1/1'].sources['image/webp'])
		.map((s) => `http://localhost:8000${s[1]} ${s[0]}w`)
		.join(', ')
	const sizes = post.picture.ratios['1/1'].media
	// console.log(srcset)
</script>

{#if isLink}
	<article in:fly class="w-full">
		<a href="media/{post.id}">
			<picture>
				<source type="image/webp" {srcset} {sizes} alt="Foto von {post.user.username}" />
				<img
					src={'http://localhost:8000' + post.picture.url}
					alt=""
					width={post.picture.width}
					height={post.picture.height}
					loading="lazy"
				/>
			</picture>
		</a>
	</article>
{:else}
	<article in:fly class="flex w-full justify-center overflow-y-auto">
		<picture class="">
			<source type="image/webp" {srcset} {sizes} alt="Foto von {post.user.username}" />
			<img
				src={'http://localhost:8000' + post.picture.url}
				alt=""
				width={post.picture.width}
				height={post.picture.height}
				loading="lazy"
			/>
		</picture>
	</article>
{/if}
