import type { CategoryType, PostType } from '$lib/types'
import type { Actions, PageServerLoad } from './$types'
import { BACKEND_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch, params }) => {
	const postId = params.id

	let post: PostType
	let categories: CategoryType[]

	const postResponse = await fetch(`/api/posts/${postId}`)
	const categoriesResponse = await fetch('/api/categories')
	if (postResponse.ok) {
		const json = await postResponse.json()
		post = json.post
	} else {
		throw error(postResponse.status, await postResponse.json())
	}

	if (categoriesResponse.ok) {
		const categoriesJson = await categoriesResponse.json()
		categories = categoriesJson.categories
	} else {
		throw error(categoriesResponse.status, await categoriesResponse.json())
	}

	return {
		post: post,
		categories: categories
	}
}

export const actions: Actions = {
	// DELETE POST
	delete: async ({ fetch, request }) => {
		const formData = await request.formData()
		const postId = formData.get('id') as string
		const url = `${BACKEND_URL}/posts/${postId}/delete/`
		const response = await fetch(url, {
			method: 'DELETE'
		})
		if (response.ok) {
			throw redirect(303, '/')
		}
	},

	set_category: async ({ fetch, request }) => {
		// UPDATA CATEGORY
		const formData = await request.formData()
		const categoryId = formData.get('category_id')
		const postId = formData.get('post_id')

		const url = `${BACKEND_URL}/posts/${postId}/update/`

		const updateCatResponse = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify({ category: categoryId }),
			headers: { Accept: 'application/json' }
		})
		if (updateCatResponse.ok) {
			console.log(categoryId)
			return {
				categoryId: categoryId
			}
		}
	}
}
