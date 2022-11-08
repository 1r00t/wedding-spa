<script lang="ts">
	import type { PostType } from '$lib/types'
	import Foto from '$lib/components/Foto.svelte'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	export let data: PageData
	const post: PostType = data.post
</script>

<Foto {post} isLink={false} />

{#if post.user.username == $page.data.user.username}
	eigenes foto
{/if}
