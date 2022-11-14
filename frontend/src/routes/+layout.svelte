<script lang="ts">
	import { accessToken } from '$lib/stores'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import '../fonts.css'
	import '../app.postcss'

	accessToken.set($page.data.token) // TODO: was wenn token abgelaufen ist??
</script>

<header
	class="fixed top-0 z-10 flex h-24 w-full items-center justify-between bg-stone-700 pr-10 text-stone-300"
>
	<a href="/" class="flex h-full items-center px-10">
		<h2 class="text-2xl">Jule & Nici</h2>
	</a>
	<nav class="flex h-full items-center">
		{#if $page.data.user.isAuthenticated}
			<form action="/logout" method="POST" use:enhance>
				<input
					type="submit"
					value="logout"
					class="inline cursor-pointer text-stone-100 hover:text-teal-100"
				/>
			</form>
		{/if}
	</nav>
</header>

<slot />

<style global lang="postcss">
	body {
		@apply font-Quicksand text-lg text-stone-600;
	}
</style>
