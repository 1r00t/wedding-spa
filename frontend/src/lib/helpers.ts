import type { TokenType } from '$lib/types'

export function clickOutside(node: Node) {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('click_outside'))
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}

export function decodeJWT(token: string): TokenType {
	const buffer = Buffer.from(token.split('.')[1], 'base64').toString()
	return JSON.parse(buffer)
}
