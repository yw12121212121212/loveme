import React from 'react'
import SideMenu from '../../component/sandbox/SideMenu'
import TopHeader from '../../component/sandbox/TopHeader'
import {Navigate, Route,Routes } from 'react-router-dom'
import Home from './home/Home.js'
import UserList from './user-manage/UserList'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import Nopermission from './nopermission/Nopermission'
import { Layout } from 'antd';
import './NewsSandBox.css'
const {Content} = Layout

export default function news() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
      <TopHeader></TopHeader>
      <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >

        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/user-manage/list' element={<UserList />}></Route>
          <Route path='/right-manage/right/list' element={<RightList />}></Route>
          <Route path='/right-manage/role/list' element={<RoleList />}></Route>
          <Route path='/' element={<Navigate to='/home' /> } />
          <Route path='*' element={<Nopermission />}></Route>

        </Routes>
      </Content>
      </Layout>

    </Layout>
  )
}
