import type { PostType } from '$lib/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, params }) => {
	const postId = params.id

	const response = await fetch(`/api/posts/${postId}`)
	if (response.ok) {
		const json = await response.json()
		const post: PostType = json.post
		return {
			post: post
		}
	}
}
