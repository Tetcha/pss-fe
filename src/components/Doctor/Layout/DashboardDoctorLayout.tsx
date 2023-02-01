import * as React from 'react';
import Link from 'next/link';
import {
	CalendarOutlined,
	EditOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	WalletOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Card, Layout, Menu } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Header } from 'antd/lib/layout/layout';
import clsx from 'clsx';

import { logout } from 'src/api/auth';
import { useStoreDoctor } from 'src/store';
const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const menuLinks: MenuItem[] = [
	{
		key: '1',
		icon: (
			<Link href="/doctor/calendar">
				<CalendarOutlined />
			</Link>
		),
		label: 'Calendar',
	},

	{
		key: '2',
		icon: (
			<Link href="/doctor/transaction">
				<WalletOutlined />
			</Link>
		),
		label: 'Transaction',
	},
];

interface DashboardDoctorLayoutProps extends React.PropsWithChildren {}

const DashboardDoctorLayout: React.FunctionComponent<DashboardDoctorLayoutProps> = ({
	children,
}) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const { name } = useStoreDoctor();

	const signOut = () => {
		logout();
		window.location.reload();
	};

	return (
		<div className="min-h-screen border-2 border-red-400">
			<Layout className="min-h-screen">
				<Sider trigger={null} className="bg-gray-50" collapsible collapsed={collapsed}>
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
					<Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={menuLinks} />
					<Card
						actions={[
							<EditOutlined key="edit" />,
							<button
								className="border-none outline-none cursor-pointer bg-inherit"
								key="sign-out"
								onClick={() => signOut()}
							>
								<LogoutOutlined />
							</button>,
						]}
						className={clsx('absolute w-full bottom-0 left-0', {
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
					<Header className="bg-white px-4">
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
