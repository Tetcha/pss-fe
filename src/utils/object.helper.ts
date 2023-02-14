import _get from 'lodash.get';

export const getObjectWithDefault = <T>(context: any, defaultValues: Record<keyof T, any>) => {
	return Object.keys(defaultValues as any).reduce<Record<keyof T, any>>((pre, cur) => {
		pre[cur as keyof T] = _get(context, cur, defaultValues[cur as keyof T]);

		if (typeof pre[cur as keyof T] === 'string' && Array.isArray(defaultValues[cur as keyof T])) {
			pre[cur as keyof T] = [_get(context, cur, '')];
		}

		return pre;
	}, {} as T);
};

export const pagingMapper = (context: any) => {
	const newFilter = {
		currentPage: context?.page || 0,
		...context,
	};

	delete newFilter.page;

	return newFilter;
};
