import { Button, Col, Row } from 'antd';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useTableUtil } from 'src/contexts/TableUtilContext';
import { FormWrapper } from './FormWrapper';

interface FormFilterWrapperProps<T = any> extends React.PropsWithChildren {
	defaultValues?: T | Record<string, any>;
}

const FormFilterWrapper = <T,>({ defaultValues, children }: FormFilterWrapperProps<T>) => {
	const methods = useForm<T | any>({ defaultValues });

	const { handleChangeFilter } = useTableUtil();

	const handleOnSearch = (data: T | Record<string, any>) => {
		handleChangeFilter(data as Record<string, any>);
	};

	return (
		<FormWrapper methods={methods}>
			<form onSubmit={methods.handleSubmit(handleOnSearch)}>
				<Row justify="end" align="bottom" className="w-full gap-2">
					{children}
					<Col style={{ textAlign: 'right' }}>
						<Button type="primary" htmlType="submit" size="large">
							Search
						</Button>
					</Col>
				</Row>
			</form>
		</FormWrapper>
	);
};

export default FormFilterWrapper;
