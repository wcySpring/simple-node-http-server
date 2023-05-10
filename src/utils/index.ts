import { createReadStream, readFileSync } from 'fs'
import path from 'path'

import { PAGE_VIEW_ROOT, ROOT } from '../setting'

const rootPath = process.cwd()
/**
 * @name: renderHtml
 * @description: 读取html
 *
 */
export function renderHtml(src: string) {
	const fullPath = path.join(rootPath, ROOT, PAGE_VIEW_ROOT, src)
	return createReadStream(fullPath)
}

/**
 * @name: renderArtTemplate
 * @description: 读取html art 渲染
 *
 */
export function renderArtTemplate(
	src: string,
	callback: (data: Buffer) => void
) {
	const data: Buffer[] = []
	const rh = renderHtml(src)
	rh.on('data', (chunk) => {
		data.push(chunk as Buffer)
	})

	rh.on('end', () => {
		callback?.(Buffer.concat(data))
	})
}

/**
 * @name: asyncRenderArtTemplate
 * @description: 同步读取html
 *
 */
export async function asyncRenderArtTemplate(src: string) {
	const fullPath = path.join(rootPath, ROOT, PAGE_VIEW_ROOT, src)

	return await readFileSync(fullPath)
}

/**
 * @name: renderStatic
 * @description: image css js 等其他静态文件
 *
 */
export function renderStatic(src: string) {
	const fullPath = path.join(rootPath, ROOT, src)
	return createReadStream(fullPath)
}
