import React, { useState } from 'react'
import { Layout,Dropdown,Menu,Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
const {Header} = Layout

export default function TopHeader() {
  const [collapsed,setCollapsed] = useState(false)
  const collapsedChange = ()=>{
    setCollapsed(!collapsed)
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a>
              超级管理员
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a >
              退出
            </a>
          ),
        }
      ]}
    />
  );
  return (
    <Header className="site-layout-background" style={{ padding: '0,15px' }}>
      {
        collapsed ? <MenuUnfoldOutlined onClick={collapsedChange} /> : 
        <MenuFoldOutlined onClick={collapsedChange} />
      }
      <div style={{float:'right'}}>
        <span>欢迎回来</span>
        <Dropdown overlay={menu}>
        <Avatar size='large' icon={<UserOutlined />} />

        </Dropdown>
      </div>
    </Header>
  )
}
