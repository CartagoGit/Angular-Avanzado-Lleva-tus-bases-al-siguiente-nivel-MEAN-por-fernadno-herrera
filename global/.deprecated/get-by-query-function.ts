const getByQuery = async (req) => {
	/**
	 * * include : boolean -> buscar exacto o que incluya el texto
	 * * skip : number -> paginando desde ...
	 * * limit : number -> paginando hasta...
	 * * sort : string -> parametro a ordenar
	 * * order : string | number -> // criterio de orden asc, desc, ascending, descending, 1, or -1
	 */
	if (req.query['include'] === undefined) req.query['include'] = 'true';
	const model = getModelSection(req);
	const paramsInModel = Object.keys(model.schema.obj);
	const wantInclude =
		(req.query['include'] as string).toLowerCase() === 'true';
	const queryParams = req.query;
	const arrayQuery = Object.entries(queryParams)
		.filter(([key]) => paramsInModel.includes(key))
		.map(([key, value]) => {
			return {
				[key]: wantInclude ? RegExp(value as string, 'i') : value,
			};
		});
	let objectQuery = {};
	for (const keyValue of arrayQuery) {
		objectQuery = { ...objectQuery, ...keyValue };
	}
	const data = await model
		.find(objectQuery)
		.skip(req.query['skip'] ? Number(req.query['skip']) : 0) // start
		.limit(req.query['limit'] ? Number(req.query['limit']) : Infinity) // finish
		.sort(
			req.query['sort']
				? {
						[req.query['sort'] as string]: req.query['order']
							? (req.query['order'] as any)
							: 'ascending', // criterio de orden asc, desc, ascending, descending, 1, or -1
				  }
				: {}
		);

	return {
		queryParams,
		include: wantInclude,
		data,
		status_code: 200,
	};
};

const getModelSection =(req: any) : any => {}
