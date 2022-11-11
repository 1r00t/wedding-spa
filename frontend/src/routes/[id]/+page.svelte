<script lang="ts">
	import Foto from '$lib/components/Foto.svelte'
	import { page } from '$app/stores'
	import type { PostType } from '$lib/types'

	import Download from '$lib/components/icons/Download.svelte'
	const post: PostType = $page.data.post
</script>

<section class="mt-10">
	<Foto {post} ratio={'4/3'} />
</section>

<section class="mt-10 flex justify-center">
	<a
		class="flex items-center gap-2 rounded-full border border-stone-600 bg-stone-50 py-2 px-4 transition-all hover:scale-105 hover:shadow-md active:translate-y-1 active:shadow-sm"
		href={post.picture.url}
		download=""
	>
		<Download />
		<span>herunterladen</span>
	</a>
</section>
