export interface SymptomForm {
	name: string;
	categoryId: string;
}

export interface SymptomDTO extends Pick<SymptomForm, 'name'> {
	id: string;
}

export interface SymptomsList extends SymptomDTO {
	createAt?: string;
	updateAt?: string;
	category?: {
		id: string;
		name: string;
	};
}
