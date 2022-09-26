import React, { useEffect,useState } from 'react'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const {  Sider } = Layout;
const {SubMenu } = Menu
const menuList = [
  {
    key:"/home",
    icon:<UserOutlined/>,
    title:"首页",
  },
  {
    key:"/user-manage",
    icon:<UserOutlined/>,
    title:"用户管理",
    children:[
      {
        key:"/user-manage/userlist",
        icon:<UserOutlined/>,
        title:"用户列表",
      }
    ]
  },
  {
    key:"/right-manage/list",
    icon:<UserOutlined/>,
    title:"权限管理",
    children:[
      {
        key:"/right-manage/rolelist",
        icon:<UserOutlined/>,
        title:"角色列表",
      },
      {
        key:"/right-manage/rightlist",
        icon:<UserOutlined/>,
        title:"权限列表",
      }
    ]
  },
]

function SideMenu(props) {
  const [menu, setMenu] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then(res=>{
      console.log(res.data)
      setMenu(res.data)
    })
  },[])
  const navigate = useNavigate();
  const renderMenu = (menu)=>{
    return menu.map(item=>{
      if(item.children?.length>0 && item.pagepermisson === 1){
        return <SubMenu key={item.key} icon={item.icon} label={item.title} title={item.title}>
          {
            renderMenu(item.children) //递归
            //或者在map一遍children
          }
        </SubMenu>
      }
      return item.pagepermisson === 1 && <Menu.Item key={item.key} icon={item.icon} label={item.title} 
      onClick={()=>{navigate(item.key)}}
      >{item.title}</Menu.Item>
    })
  }
  // console.log(location)
  const selectKeys = [location.pathname]
  //用/分割路径去索引为1的
  const openKeys = ["/"+location.pathname.split("/")[1]]
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
        <div className="logo" >全球新闻发布管理系统</div>
        <div style={{flex:1,overflow: 'auto'}}>
          <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectKeys}
          defaultOpenKeys={openKeys}
          
          >
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
export default SideMenu;
