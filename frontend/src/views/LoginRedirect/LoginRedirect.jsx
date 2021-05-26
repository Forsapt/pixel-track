import React from 'react'
import {Button, Layout, Space, Typography} from 'antd';
import {Redirect} from "react-router-dom";

const {Header, Footer, Content} = Layout;
const {Text} = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    render: id => <>
      <Space>
        <Button type={'danger'} onClick={() => console.log(`Delete ${id}`)}>Delete</Button>
        <Button type={'primary'} onClick={() => console.log(`View ${id}`)}>View</Button>
      </Space>
    </>,
  }
];

let data = [
  {
    id: '1',
    name: 'Tracker 1',
  },
  {
    id: '2',
    name: 'Tracker 2',
  },
  {
    id: '3',
    name: 'Tracker 3',
  },
];

data = data.map(item => {
  return {...item, key: item.id}
})

function LoginRedirect() {
  let url = window.location.href;
  if (url.split('#').length > 1) {
    let accessToken = url.split('#')[1].split('&')[0];
    let refreshToken = url.split('#')[1].split('&')[1];
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  }
  return (
    <>
      <Layout>
        <Header>
        </Header>
        <Content
          style={{
            padding: 32,
            margin: 0,
            minHeight: 'calc(100vh - 134px)'
          }}
        >
          <Redirect to={'/trackers'}/>
        </Content>
        <Footer><Text type={'secondary'}>Created by Demidovich Maxim</Text></Footer>
      </Layout>
    </>
  )
}

export default LoginRedirect
