import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, fetch, locals }) => {

    if (!locals.user?.isAuthenticated) throw redirect(301, '/')

    const id = params.id

    const postResponse = await fetch(`http://localhost:8000/posts/${id}/`)
    let post = {}
    if (postResponse.ok) {
        post = await postResponse.json()
    }

    return {
        id,
        post
    }
}