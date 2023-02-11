import * as React from 'react';
import { useRouter } from 'next/router';
import _get from 'lodash.get';

export enum SortOrder {
	ASC = 'ASC',
	DESC = 'DESC',
}

export interface ITableUtilContext {
	pageSize: number;
	currentPage: number;
	totalItem: number;
	orderBy: string;
	order: SortOrder;
	handleOnChangePage: (page: number, limit: number) => void;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
	handleOnReset: () => void;
	setTotalItem: React.Dispatch<React.SetStateAction<number>>;
	handleOnChangeOrderFiled: (field: string) => void;
	handleChangeFilter: (filters: Record<string, any>) => void;
}

const TableUtilContext = React.createContext<ITableUtilContext>({
	pageSize: 10,
	currentPage: 1,
	totalItem: 0,
	handleOnChangePage: () => {},
	setPageSize: () => {},
	setTotalItem: () => {},
	handleOnChangeOrderFiled: () => {},
	orderBy: '',
	handleOnReset: () => {},
	order: SortOrder.ASC,
	handleChangeFilter: () => {},
});
export interface TableProviderProps {
	children: React.ReactNode;
}

export const TableUtilProvider: React.FC<TableProviderProps> = ({ children }) => {
	const [pageSize, setPageSize] = React.useState<number>(10);
	const [currentPage, setCurrentPage] = React.useState<number>(0);
	const [totalItem, setTotalItem] = React.useState<number>(0);
	const [orderBy, setOrderBy] = React.useState<string>('createdAt');
	const [order, setOrder] = React.useState<SortOrder>(SortOrder.ASC);
	const router = useRouter();

	const handleChangeFilter = (filters: Record<string, any>) => {
		setCurrentPage(0);

		router.push({
			query: {
				...router.query,
				...filters,
				page: 0,
			},
		});
	};

	const handleOnReset = () => {
		setCurrentPage(0);
		router.push({
			query: {
				page: 0,
				pageSize,
			},
		});
	};

	const handleOnChangeOrderFiled = (field: string) => {
		let newField = orderBy;
		let newSortOrder = order;
		if (orderBy === field) {
			if (order === SortOrder.ASC) {
				newSortOrder = SortOrder.DESC;
			} else {
				newField = 'createdAt';
				newSortOrder = SortOrder.ASC;
			}
		} else {
			newField = field;
			newSortOrder = SortOrder.ASC;
		}
		setOrderBy(newField);
		setOrder(newSortOrder);
		router.push({
			query: {
				...router.query,
				orderBy: newField,
				order: newSortOrder,
			},
		});
	};

	const handleOnChangePage = (paramPage: number, newPageSize: number) => {
		let newPage = paramPage;
		if (paramPage < 0 || newPageSize !== pageSize) {
			newPage = 0;
		} else if (paramPage >= totalItem) {
			newPage = totalItem - 1;
		}

		setPageSize(newPageSize);
		setCurrentPage(newPage);

		router.push({
			query: {
				...router.query,
				currentPage,
				pageSize: newPageSize,
			},
		});
	};

	React.useEffect(() => {
		const pageNumber = _get(router.query, 'page', 0);
		const newPageSize = _get(router.query, 'pageSize', 10);

		if (pageNumber === 0) {
			setCurrentPage(Number(pageNumber));
		}
		if (pageSize === 10) {
			setPageSize(Number(newPageSize));
		}
	}, []);

	return (
		<TableUtilContext.Provider
			value={{
				handleOnReset,
				pageSize,
				handleChangeFilter,
				currentPage,
				handleOnChangePage,
				totalItem,
				setTotalItem,
				handleOnChangeOrderFiled,
				orderBy,
				order,
				setPageSize,
			}}
		>
			{children}
		</TableUtilContext.Provider>
	);
};

export const useTableUtil = () => {
	const context = React.useContext(TableUtilContext);

	return { ...context };
};
