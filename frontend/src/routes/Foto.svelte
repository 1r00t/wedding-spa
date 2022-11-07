<script lang="ts">
	import type { Post } from '$lib/types'

	export let post: Post
</script>

<article>
	<a href="media/{post.id}">
		<img src={post.foto} alt="Foto von {post.user.username}" />
	</a>
</article>
