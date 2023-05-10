import {
	indexPage,
	errorPage,
	aboutPage,
	uploadPage,
	uploadFile,
} from './middle'

/**
 * @description： 导出路由配置,
 *
 */
export default {
	'/': {
		page: 'index.html', // 渲染html
		serverRequest: indexPage, // 中间层
	},
	'/about': {
		page: 'about.html',
		serverRequest: aboutPage,
	},
	'/upload': {
		page: 'upload.html',
		serverRequest: uploadPage,
	},

	'/upload/file': {
		// page: 'upload.html',
		serverRequest: uploadFile,
	},
	error: {
		page: 'error.html',
		serverRequest: errorPage,
	},
}
