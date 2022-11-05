<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import '../fonts.css'
	import '../app.postcss'
</script>

<header
	class="fixed top-0 flex h-24 w-full items-center justify-between bg-stone-700 pr-10 text-stone-300"
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

<main class="mt-24 min-h-[calc(100vh-6rem)] bg-stone-100 pb-20">
	<div class="mx-auto max-w-md px-10 pt-10">
		<slot />
	</div>
</main>

<style global lang="postcss">
	body {
		@apply font-Quicksand text-lg text-stone-600;
	}
</style>
