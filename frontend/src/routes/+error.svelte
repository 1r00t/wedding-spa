<script>
	import { page } from '$app/stores'
</script>

<main class="mt-24 min-h-[calc(100vh-6rem)] w-screen bg-stone-100 pt-10 pb-20">
	<section class="mt-10 text-center">
		<h2 class="text-4xl">Fehler</h2>
		<p class="mt-20"><strong>{$page.status}: </strong>{$page.error?.message}</p>
	</section>
</main>
