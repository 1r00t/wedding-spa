import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PostType } from '$lib/types'

export const load: PageServerLoad = async ({ params, fetch, locals }) => {

    if (!locals.user?.isAuthenticated) throw redirect(301, '/login')

    const id = params.id
    let post: PostType

    const response = await fetch(`http://localhost:8000/posts/${id}/?picture_rato=&picture_sm=12&picture_md=12&picture_lg=12&picture_xl=12&picture_2xl=12`)

    if (response.ok) {
        post = await response.json()
    } else {
        return error(404, JSON.stringify({ details: "post not found!" }))
    }

    return {
        post
    }
}