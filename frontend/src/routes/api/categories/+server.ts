import type { RequestHandler } from './$types'
import { BACKEND_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'
import type { CategoryType } from '$lib/types'

export const GET: RequestHandler = async ({ url, fetch }) => {
    const response = await fetch(`${BACKEND_URL}/posts/categories/`)

    if (response.ok) {
        const categories = await response.json()

        return new Response(
            JSON.stringify({
                categories
            })
        )
    }

    throw error(response.status, 'Konnte keine Kategorie laden!')
}
