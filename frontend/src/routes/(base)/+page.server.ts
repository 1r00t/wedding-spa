import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PostType, CategoryType } from '$lib/types'

export const load: PageServerLoad = async ({ fetch, locals, depends }) => {
	if (!locals.user?.isAuthenticated) {
		throw redirect(303, '/login')
	}

	depends('app:posts')

	let posts: PostType[] = []
	let current = 1
	let previous: number | null = null
	let next: number | null = null
	let count = 0
	let categories: CategoryType[] = [{ id: 1, name: 'Alle Kategorien' }]
	const postsResponse = await fetch('/api/posts?page=1')
	const categoriesResponse = await fetch('api/categories')

	if (postsResponse.ok) {
		const postsJson = await postsResponse.json()
		posts = postsJson.posts
		current = postsJson.current
		previous = postsJson.previous
		next = postsJson.next
		count = postsJson.count
	}

	if (categoriesResponse.ok) {
		const categoriesJson = await categoriesResponse.json()
		categories = categoriesJson.categories
	}
	return {
		posts,
		current,
		previous,
		next,
		count,
		categories
	}
}
