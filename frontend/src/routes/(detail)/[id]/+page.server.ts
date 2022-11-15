import type { PostType } from '$lib/types'
import type { Actions, PageServerLoad } from './$types'
import { BACKEND_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch, params }) => {
	const postId = params.id

	const response = await fetch(`/api/posts/${postId}`)
	if (response.ok) {
		const json = await response.json()
		const post: PostType = json.post
		return {
			post: post
		}
	} else {
		throw error(response.status, await response.json())
	}
}

export const actions: Actions = {
	delete: async ({ fetch, request }) => {
		const formData = await request.formData()
		const postId = formData.get('id') as string
		const url = `${BACKEND_URL}/posts/${postId}/delete/`
		const response = await fetch(url, {
			method: "DELETE"
		})
		if (response.ok) {
			throw redirect(303, '/')
		}
	}
}