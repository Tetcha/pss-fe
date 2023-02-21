import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	CalendarOutlined,
	EditOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	TableOutlined,
	WalletOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Layout, Menu } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Header } from 'antd/lib/layout/layout';
import clsx from 'clsx';

import { logout } from 'src/api/student/auth';
import { ROUTES_URL } from 'src/constants/routes';
import { useStoreDoctor } from 'src/store';
import { currencyFormat } from 'src/utils/string.helper';
const { Sider, Content } = Layout;

const menuLinks = [
	{
		label: 'Slots',
		icon: <CalendarOutlined />,
		children: [
			{
				key: ROUTES_URL.DOCTOR_SLOTS_CALENDAR,
				label: 'Calendar',
			},
			{
				key: ROUTES_URL.DOCTOR_SLOTS_WEEK_CALENDAR,
				label: 'Week Calendar',
			},
		],
	},

	{
		key: ROUTES_URL.DOCTOR_BOOKING,
		icon: <TableOutlined />,
		label: 'Booking',
	},
	{
		key: ROUTES_URL.DOCTOR_TRANSACTION,
		icon: <WalletOutlined />,
		label: 'Transaction',
	},
];

interface DashboardDoctorLayoutProps extends React.PropsWithChildren {}

const DashboardDoctorLayout: React.FunctionComponent<DashboardDoctorLayoutProps> = ({
	children,
}) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const { name, balance, avatar } = useStoreDoctor();
	const router = useRouter();

	const signOut = () => {
		logout();
		window.location.reload();
	};

	return (
		<div className="min-h-screen">
			<Layout className="min-h-screen">
				<Sider trigger={null} className="bg-gray-50" width={240} collapsible collapsed={collapsed}>
					<div className="flex justify-center w-full">
						<Link href={'/'}>
							<div className="w-20 h-20">
								<img
									src="/assets/images/logo/logo.png"
									alt="PSS-logo"
									className="object-cover w-full h-full"
								/>
							</div>
						</Link>
					</div>
					<Menu
						theme="light"
						mode="inline"
						className="max-h-screen"
						defaultSelectedKeys={[ROUTES_URL.DOCTOR_BOOKING]}
						items={menuLinks as any}
						onClick={(item) => router.push(item.key)}
					/>
					<Card
						actions={[
							<EditOutlined key="edit" onClick={() => router.push(ROUTES_URL.DOCTOR_ME)} />,
							<button
								className="border-none outline-none cursor-pointer bg-inherit"
								key="sign-out"
								onClick={() => signOut()}
							>
								<LogoutOutlined />
							</button>,
						]}
						className={clsx('fixed w-[240px] bottom-0 left-0', {
							hidden: collapsed,
							block: !collapsed,
						})}
					>
						<Meta
							avatar={<Avatar src={avatar || `https://ui-avatars.com/api/?name=${name}`} />}
							description={
								<p className="text-base font-medium text-gray-900">{currencyFormat(balance)}</p>
							}
							title={name}
						/>
					</Card>
				</Sider>
				<Layout className="site-layout">
					<Header className="px-4 bg-white">
						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
							onClick: () => setCollapsed(!collapsed),
						})}
					</Header>
					<Content
						className="site-layout-background"
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default DashboardDoctorLayout;
