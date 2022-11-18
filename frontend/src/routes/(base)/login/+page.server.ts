import type { Action, Actions, PageServerLoad } from './$types'
import { PASSWORD } from '$env/static/private'
import { invalid, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user?.isAuthenticated) throw redirect(301, '/')
}

const password: Action = async ({ request }) => {
	const data = await request.formData()
	const password = data.get('password') as string

	if (password === PASSWORD) {
		return {
			passwordCorrect: true
		}
	} else {
		return invalid(403, { passwordWrong: true })
	}
}

const username: Action = async ({ request, fetch, cookies }) => {
	const data = await request.formData()
	let username = data.get('username') as string
	username = username.trim()

	if (username.length < 3) {
		return invalid(400, { usernameTooShort: true, passwordCorrect: true })
	}

	const response = await fetch('https://backend.brandts.wedding/login/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username: username, password: PASSWORD })
	})
	console.error('blablabalab', response.statusText, response.body)
	console.log('hieasdfasdfasdfasdfr', response.status, response.statusText, response.body)
	if (response.ok) {
		const { refresh, access } = await response.json()
		cookies.set('refresh', refresh, { httpOnly: true })
		cookies.set('access', access, { httpOnly: true })
		throw redirect(301, '/')
	}
}

export const actions: Actions = { password, username }
