import http from 'http'
import { asyncRenderArtTemplate } from '../utils'
import artTemplate from 'art-template'

/**
 * @name：errorPage
 * @description： url 不存在时候例如404
 *
 */
const errorPage = async (
	req: http.IncomingMessage,
	res: http.ServerResponse,
	pageSrc: string
) => {
	const { method } = req

	if (method === 'GET') {
		// 将读取的html 写入到返回的响应
		const data = await asyncRenderArtTemplate(pageSrc)

		const renderHtml = artTemplate.render(data.toString(), {
			status: '404',
		})
		res.end(renderHtml)
	}
}

export default errorPage
