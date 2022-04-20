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
} from 'react-admin'

const apiUrl = 'http://localhost:3100'

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

		return fetch(url).then((response) => response.json())
	},

	getOne: (resource: string, params: GetOneParams): Promise<GetOneResult> => {
		return fetch(`${apiUrl}/${resource}/${params.id}`).then((response) =>
			response.json()
		)
	},

	getMany: (
		resource: string,
		params: GetManyParams
	): Promise<GetManyResult> => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		}
		const url = `${apiUrl}/${resource}?${query}`
		return fetch(url).then((response) => response.json())
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

		return fetch(url).then((response) => response.json())
	},

	update: (resource: string, params: UpdateParams): Promise<UpdateResult> => {
		return fetch(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then((response) => response.json())
	},

	updateMany: (
		resource: string,
		params: UpdateManyParams
	): Promise<UpdateManyResult> => {
		const query = { filter: JSON.stringify({ id: params.ids }) }
		return fetch(`${apiUrl}/${resource}?${query}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then((response) => response.json())
	},

	create: (resource: string, params: CreateParams): Promise<CreateResult> => {
		return fetch(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then((response) => response.json())
	},

	delete: (resource: string, params: DeleteParams): Promise<DeleteResult> => {
		return fetch(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
		}).then((response) => response.json())
	},

	deleteMany: (
		resource: string,
		params: DeleteManyParams
	): Promise<DeleteManyResult> => {
		const query = { filter: JSON.stringify({ id: params.ids }) }
		return fetch(`${apiUrl}/${resource}?${query}`, {
			method: 'DELETE',
		}).then((response) => response.json())
	},
}

export default dataProvider
