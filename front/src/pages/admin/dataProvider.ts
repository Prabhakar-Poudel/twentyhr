import {
	CreateParams,
	CreateResult,
	DataProvider,
	DeleteManyParams,
	DeleteManyResult,
	DeleteParams,
	DeleteResult,
	GetListParams,
	GetListResult,
	GetManyParams,
	GetManyReferenceParams,
	GetManyReferenceResult,
	GetManyResult,
	GetOneParams,
	GetOneResult,
	UpdateManyParams,
	UpdateManyResult,
	UpdateParams,
	UpdateResult,
	fetchUtils,
} from 'react-admin'

const apiUrl = 'http://localhost:3100'
const httpClient = fetchUtils.fetchJson

const dataProvider: DataProvider = {
	getList: (
		resource: string,
		params: GetListParams
	): Promise<GetListResult> => {
		// const { page, perPage } = params.pagination
		// const { field, order } = params.sort
		// const query = {
		//   sort: JSON.stringify([field, order]),
		//   range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
		//   filter: JSON.stringify(params.filter),
		// }
		// const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`
		const url = `${apiUrl}/${resource}`

		return httpClient(url).then(({ json }) => json)
	},

	getOne: (resource: string, params: GetOneParams): Promise<GetOneResult> => {
		const url = `${apiUrl}/${resource}/${params.id}`
		return httpClient(url).then(({ json }) => json)
	},

	getMany: (
		resource: string,
		params: GetManyParams
	): Promise<GetManyResult> => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		}
		const url = `${apiUrl}/${resource}?${query}`
		return httpClient(url).then(({ json }) => json)
	},

	getManyReference: (
		resource: string,
		params: GetManyReferenceParams
	): Promise<GetManyReferenceResult> => {
		const { page, perPage } = params.pagination
		const { field, order } = params.sort
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify({
				...params.filter,
				[params.target]: params.id,
			}),
		}
		const url = `${apiUrl}/${resource}?${query}`

		return httpClient(url).then(({ json }) => json)
	},

	update: (resource: string, params: UpdateParams): Promise<UpdateResult> => {
		const url = `${apiUrl}/${resource}/${params.id}`
		return httpClient(url, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => json)
	},

	updateMany: (
		resource: string,
		params: UpdateManyParams
	): Promise<UpdateManyResult> => {
		const query = { filter: JSON.stringify({ id: params.ids }) }
		return fetch(`${apiUrl}/${resource}?${query}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => json as UpdateManyResult)
	},

	create: (resource: string, params: CreateParams): Promise<CreateResult> => {
		const url = `${apiUrl}/${resource}`
		return httpClient(url, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then(({ json }) => json)
	},

	delete: (resource: string, params: DeleteParams): Promise<DeleteResult> => {
		const url = `${apiUrl}/${resource}/${params.id}`
		return httpClient(url, {
			method: 'DELETE',
		}).then(({ json }) => json)
	},

	deleteMany: (
		resource: string,
		params: DeleteManyParams
	): Promise<DeleteManyResult> => {
		const query = { filter: JSON.stringify({ id: params.ids }) }
		const url = `${apiUrl}/${resource}?${query}`
		return httpClient(url, {
			method: 'DELETE',
		}).then(({ json }) => json)
	},
}

export default dataProvider
