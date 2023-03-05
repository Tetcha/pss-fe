export interface Category {
	id: string;
	name: string;
}

export interface AddCategoryForm {
	name: string;
}

export interface AddCategoryDTO extends AddCategoryForm {}
