import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import { http } from 'src/config/axios';
import { ENV_VARIABLES } from 'src/constants/env';
import { useStoreUser } from 'src/store';

interface StudentBalanceProps {}

interface AddMomoBalanceForm {
	amount: number;
	redirect: string;
}

const defaultValues: AddMomoBalanceForm = {
	amount: 0,
	redirect: '',
};

const StudentBalance: React.FunctionComponent<StudentBalanceProps> = () => {
	const { name, avatar, balance } = useStoreUser();

	const method = useForm<AddMomoBalanceForm>({ defaultValues });

	const handleOnSubmit = async (data: AddMomoBalanceForm) => {
		const { amount } = data;

		console.log(amount);
		http
			.post('/transaction', { amount, redirectUrl: ENV_VARIABLES.ORIGIN_URL + '/student/balance' })
			.then((res) => {
				window.open(res.data);
			})
			.catch((err) => {
				toast.error('Something went wrong');
			});
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center w-full h-full px-2 py-5">
				<div className="w-full h-[250px]">
					<LazyLoadImage
						src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
						className="w-full h-full rounded-tl-lg rounded-tr-lg"
					/>
				</div>
				<div className="w-full pb-8 bg-white rounded-lg shadow-xl max-w-container">
					<div className="flex flex-col items-center -mt-20">
						<LazyLoadImage
							className="w-40 border-4 border-white rounded-full"
							src={
								avatar
									? avatar
									: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`
							}
							alt=""
						/>

						<div className="flex items-center justify-center mt-2 space-x-2">
							<div className="text-2xl">{name}</div>
							<CheckCircleFilled
								type="icon"
								style={{
									fontSize: '16px',
									color: '#08c',
									marginBottom: '-6px',
								}}
							/>
						</div>
						<p className="text-gray-700">Student At FPT University</p>
						<p className="text-sm text-gray-500">Thu Duc, HCM City</p>
					</div>
					<div className="flex flex-col items-center justify-end flex-1 px-8 mt-2 lg:items-end"></div>
					<div className="flex flex-col items-center justify-center my-4 space-y-4 2xl:space-y-0 2xl:space-x-4">
						<form
							className="flex flex-col w-full 2xl:w-1/3"
							onSubmit={method.handleSubmit(handleOnSubmit)}
						>
							<div className="">
								<p className="block text-2xl font-medium leading-6 text-gray-900">
									Current Balance: {balance} VND
								</p>
							</div>
							<div>
								<label
									htmlFor="amount"
									className="block text-2xl font-medium leading-6 text-gray-900"
								>
									Add Balance
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<input
										type="text"
										id="amount"
										{...method.register('amount')}
										className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
										placeholder="0.00"
										min={0}
									/>
									<div className="absolute inset-y-0 right-0 flex items-center">
										<label htmlFor="currency" className="sr-only">
											Currency
										</label>
										<select
											id="currency"
											name="currency"
											className="h-full py-0 pl-2 text-gray-500 bg-transparent border-0 rounded-md pr-7 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl"
										>
											<option>VND</option>
										</select>
									</div>
								</div>
								<Button className="w-full mt-4" type="primary" htmlType="submit" size="large">
									Add balance by MOMO
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudentBalance;
