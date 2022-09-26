import React, { useEffect,useState } from 'react'
import { Button, Table, Tag ,Modal,Popover,Switch} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;
export default function UserList() {
  const [dataSource,setDataSource] = useState([])

 useEffect(()=>{
   axios.get("http://localhost:5000/rights?_embed=children").then(res=>{
    // console.log(res)
    (res.data).forEach(item=>{
      if(item.children.length === 0){
        item.children = ""
      }
    })
    setDataSource(res.data)
    })
 },[])

  const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: (id) => {
            return <b>{id}</b>
        }
    },
    {
        title: '权限名称',
        dataIndex: 'title'
    },
    {
        title: "权限路径",
        dataIndex: 'key',
        render: (key) => {
            return <Tag color="orange">{key}</Tag>
        }
    },
    {
        title: "操作",
        render: (item) => {
            return <div>
                <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                <Popover content={<div style={{textAlign:"center"}}>
                        <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
                    </div>} title="页面配置项" trigger={item.pagepermisson===undefined?'':'click'}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}/>
                    </Popover>
            </div>
        }
    }
];

const confirmMethod = (item)=>{
  confirm({
    title: "确定要删除吗?",
    icon: <ExclamationCircleOutlined />,
    onOk() {
      deleteItem(item);
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

const deleteItem = (item) => {
  if(item.grade === 1){
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5000/rights/${item.id}`)

  }else{
    const list = dataSource.filter(data => data.id === item.rightId)
    list[0].children = list[0].children.filter(data => data.id !== item.id);
    setDataSource([...dataSource])
    axios.delete(`http://localhost:5000/children/${item.id}`)

  }
}

const  switchMethod = (item)=>{
  item.pagepermisson = item.pagepermisson===1?0:1
  // console.log(item)
  setDataSource([...dataSource])

  if(item.grade===1){
      axios.patch(`http://localhost:5000/rights/${item.id}`,{
          pagepermisson:item.pagepermisson
      })
  }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{
          pagepermisson:item.pagepermisson
      })
  }
}

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
