import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	AreaChartOutlined,
	EditOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	WalletOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Layout, Menu } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Header } from 'antd/lib/layout/layout';
import clsx from 'clsx';

import { logout } from 'src/api/auth';
import { ROUTES_URL } from 'src/constants/routes';
import { useStoreAdmin } from 'src/store';
const { Sider, Content } = Layout;

const menuLinks = [
	{
		key: ROUTES_URL.ADMIN,
		icon: <AreaChartOutlined />,
		label: 'Dashboard',
	},
	{
		icon: <UserOutlined />,
		label: 'User',
		children: [
			{
				label: 'Students',
				key: ROUTES_URL.USER_STUDENTS,
			},
			{
				label: 'Doctors',
				key: ROUTES_URL.USER_DOCTORS,
			},
			{
				label: 'Admins',
				key: ROUTES_URL.USER_ADMINS,
			},
		],
	},
	{
		key: ROUTES_URL.ADMIN_TRANSACTION,
		icon: <WalletOutlined />,
		label: 'Transaction',
	},
];

interface DashboardLayoutProps extends React.PropsWithChildren {}

const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = ({ children }) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const { name } = useStoreAdmin();

	const router = useRouter();

	const signOut = () => {
		logout();
		window.location.reload();
	};

	return (
		<div className="min-h-screen">
			<Layout className="min-h-screen">
				<Sider trigger={null} className=" bg-gray-50" width={240} collapsible collapsed={collapsed}>
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
						defaultSelectedKeys={['1']}
						items={menuLinks as any}
						onClick={(item) => router.push(item.key)}
					/>
					<Card
						actions={[
							<EditOutlined key="edit" onClick={() => router.push(ROUTES_URL.ADMIN_ME)} />,
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
							avatar={<Avatar src={`https://ui-avatars.com/api/?name=${name}`} />}
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

export default DashboardLayout;
