export interface SymptomForm {
	name: string;
	categoryId: string;
}

export interface SymptomDTO extends Pick<SymptomForm, 'name'> {
	id: string;
}
