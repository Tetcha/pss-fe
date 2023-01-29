import * as React from 'react';
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useRouter } from 'next/router';
const { Sider, Content } = Layout;

interface DashboardLayoutProps extends React.PropsWithChildren {}

const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = ({ children }) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const router = useRouter();

	return (
		<div className="min-h-screen border-2 border-red-400">
			<Layout className="min-h-screen">
				<Sider trigger={null} className="bg-gray-50" collapsible collapsed={collapsed}>
					<div className="logo">Logo</div>
					<Menu
						theme="light"
						mode="inline"
						defaultSelectedKeys={['1']}
						items={[
							{
								key: '1',
								icon: <UserOutlined />,
								label: 'User ',
								onClick: () => router.push('/admin/users'),
							},
							{
								key: '2',
								icon: <VideoCameraOutlined />,
								label: 'nav 2',
							},
							{
								key: '3',
								icon: <UploadOutlined />,
								label: 'nav 3',
							},
						]}
					/>
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
