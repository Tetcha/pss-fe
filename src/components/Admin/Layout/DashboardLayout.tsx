import * as React from 'react';
import {
	UploadOutlined,
	UserOutlined,
	AreaChartOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	EditOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStoreAdmin } from 'src/store';
import Meta from 'antd/lib/card/Meta';
import clsx from 'clsx';
import { logout } from 'src/api/auth';
const { Sider, Content } = Layout;

interface DashboardLayoutProps extends React.PropsWithChildren {}

const menuLinks = [
	{
		key: '1',
		icon: <AreaChartOutlined />,
		label: 'Dashboard',
		link: '/admin/users',
	},
	{
		key: '2',
		icon: <UserOutlined />,
		label: 'User',
		link: '/admin/users',
	},
	{
		key: '3',
		icon: <UploadOutlined />,
		label: 'nav 3',
		link: '/admin/users',
	},
];

const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = ({ children }) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const router = useRouter();
	const { name } = useStoreAdmin();
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
					<Menu
						theme="light"
						mode="inline"
						defaultSelectedKeys={['1']}
						items={menuLinks.map((menu) => ({ onClick: () => router.push(menu.link), ...menu }))}
					/>
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
					<Header className="bg-white" style={{ padding: 0 }}>
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
