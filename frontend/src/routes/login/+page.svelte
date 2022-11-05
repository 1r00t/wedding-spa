<script lang="ts">
	import { enhance } from '$app/forms'

	import type { ActionData } from './$types'

	export let form: ActionData
</script>

{#if !form?.passwordCorrect}
	<section class="mt-10 flex flex-col space-y-10">
		<h3 class="text-2xl font-semibold">Hallo Hochzeitsgast!</h3>
		<p>
			Auf dieser Webseite kannst du dir alle Fotos und Videos anschauen, die auf unserer Hochzeit
			entstanden sind.
		</p>
		<p>Du kannst auch deine eigenen Aufnahmen hinzufügen.</p>
		<form action="?/password" method="POST" use:enhance class="flex justify-center">
			<input
				type="password"
				name="password"
				placeholder="Passwort"
				autocomplete="new-password"
				required
				class="w-40 rounded-l-md border-none px-3 py-2 shadow-lg placeholder:text-stone-400 focus:ring-0"
			/>
			<input
				type="submit"
				value="weiter"
				class="cursor-pointer rounded-r-md border-none bg-cyan-600 px-4 py-2 text-cyan-50 shadow-lg transition-colors hover:bg-cyan-500"
			/>
		</form>
		{#if form?.passwordWrong}
			<p>Password falsch!</p>
		{/if}
	</section>
{:else}
	<section class="mt-10 flex flex-col space-y-10">
		<h3 class="text-2xl font-semibold">Benutzernamen wählen</h3>
		<p>Jetzt kannst du einen Benutzernamen wählen.</p>
		<p>
			Dieser wird mit deinen hochgeladenen Aufnahmen verknüpft, sodass sie zugeordnet werden können.
		</p>
		<form action="?/username" method="POST" use:enhance class="flex justify-center">
			<input
				type="text"
				name="username"
				placeholder="Benutzername"
				autocomplete="name"
				required
				class="w-40 rounded-l-md border-none px-3 py-2 shadow-lg placeholder:text-stone-400 focus:ring-0"
			/>
			<input
				type="submit"
				value="weiter"
				class="cursor-pointer rounded-r-md border-none bg-cyan-600 px-4 py-2 text-cyan-50 shadow-lg transition-colors hover:bg-cyan-500"
			/>
		</form>
		{#if form?.usernameTooShort}
			<p>Der Name muss mindestens aus 3 Zeichen bestehen</p>
		{/if}
	</section>
{/if}
