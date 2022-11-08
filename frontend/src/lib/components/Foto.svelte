<script lang="ts">
	import type { PostType } from '$lib/types'
	import { fly } from 'svelte/transition'

	export let post: PostType
	export let isLink: boolean = true
</script>

{#if isLink}
	<article in:fly class="w-full">
		<a href="media/{post.id}">
			<img src={post.foto} alt="Foto von {post.user.username}" />
		</a>
	</article>
{:else}
	<article in:fly class="w-full overflow-y-auto">
		<img src={post.foto} alt="Foto von {post.user.username}" />
	</article>
{/if}
