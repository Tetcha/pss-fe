import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';

import { FormWrapper, TextareaField, TextField } from 'src/components/Input';

import { ScheduleDTO } from './interface';

const defaultValues: ScheduleDTO = {
	name: '',
	email: '',
	phone: '',
	date: '',
	time: '',
	question: '',
};

interface ScheduleProps {}

const Schedule: FunctionComponent<ScheduleProps> = () => {
	const methods = useForm<ScheduleDTO>({
		defaultValues,
	});
	const handleOnSubmit = async (data: ScheduleDTO) => {
		// const res = await authLogin(data);
		// if (res) window.location.reload();
		console.log('data', data);
		// router.push(routes.homeUrl);
	};
	return (
		<>
			<div className="w-full h-auto mt-10 flex justify-center">
				<div className="w-full h-auto max-w-container flex flex-col justify-center items-center">
					<h1 className="">ĐẶT LỊCH THĂM KHÁM</h1>
					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
						<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
							<FormWrapper methods={methods}>
								<form className="space-y-6" onSubmit={methods.handleSubmit(handleOnSubmit)}>
									<TextField commonField={{ label: 'Name', name: 'name' }} />
									<TextField commonField={{ label: 'Email', name: 'email' }} />
									<TextField commonField={{ label: 'Phone', name: 'Phone' }} type="number" />
									<TextareaField commonField={{ label: 'Question', name: 'question' }} />
									<div className="flex flex-col items-center space-y-4">
										<button
											type="submit"
											className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
										>
											Đăng ký
										</button>
									</div>
								</form>
							</FormWrapper>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Schedule;
