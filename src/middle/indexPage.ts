import http from 'http'
import { renderHtml } from '../utils'

/**
 * @name：indexPage
 * @description： url /index 路由映射
 *
 */

const indexPage = (
	req: http.IncomingMessage,
	res: http.ServerResponse,
	pageSrc: string
) => {
	const { method } = req
	console.log(method)

	if (method === 'GET') {
		// 将读取的html 写入到返回的响应
		renderHtml(pageSrc).pipe(res)
	}
}

export default indexPage
