<script lang="ts">
	import type { PostType } from '$lib/types'
	import { onMount } from 'svelte'

	export let ratio = '1/1'

	export let post: PostType

	let imgEl: HTMLImageElement
	let srcEl: HTMLSourceElement

	const srcset = Object.entries(post.picture.ratios[ratio]?.sources['image/webp'])
		.map((s) => `https://backend.brandts.wedding${s[1]} ${s[0]}w`)
		.join(', ')

	const sizes = post.picture.ratios[ratio].media

	onMount(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0
		}
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				imgEl.src = 'https://backend.brandts.wedding' + post.picture.url
				srcEl.srcset = srcset
			}
		}, options)
		observer.observe(imgEl)
	})
</script>

<div>
	<picture>
		<source
			bind:this={srcEl}
			type="image/webp"
			srcset=""
			{sizes}
			alt="Foto von {post.user.username}"
		/>
		<img
			bind:this={imgEl}
			src=""
			alt=""
			width={post.picture.width}
			height={post.picture.height}
			loading="lazy"
			class="bg-gradient-to-br from-stone-100 to-stone-200 transition-opacity"
		/>
	</picture>
</div>
