<script lang="ts">
	export let data
	const { id, post } = data
</script>

<article>
	<img src={post.foto} alt="Foto von {post.user.username}" />
</article>
