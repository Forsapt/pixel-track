import React from 'react'
import {Layout, Typography} from 'antd';
import {Redirect} from "react-router-dom";

const {Header, Footer, Content} = Layout;
const {Text} = Typography;

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
