import React from 'react'
import {Button, Col, Layout, Row, Typography} from 'antd';
import {BarChartOutlined, EditOutlined, GoogleOutlined, PlusCircleOutlined, SnippetsOutlined} from '@ant-design/icons'

const {Footer, Content} = Layout;
const {Text, Title} = Typography;


function MainPage() {
  return (
    <>
      <Layout>
        <Content
          style={{
            padding: 32,
            margin: 0,
            minHeight: 'calc(100vh - 134px + 64px)'
          }}
        >
          <div style={{height: '20vh'}}>

          </div>
          <Row align={'center'} justify={'center'} styles={{alignItems: 'center'}}>
            <Col span={24} md={8} sm={24}>
              <Row align={'center'}>
                <Title>Pixel Track</Title>
              </Row>
              <Row align={'center'}>
                <Button type={'primary'} icon={<GoogleOutlined/>} href={"/auth/google"}>Login with Google</Button>
              </Row>
            </Col>
            <Col span={24} md={12} sm={24} style={{padding: 10}}>
              <Row align={'center'}>
                <Text style={{fontSize: 18}}>
                  <EditOutlined/> Зарегистрируйтесь на сайте
                </Text>
              </Row>
              <Row align={'center'}>
                <Text style={{fontSize: 18}}>
                  <PlusCircleOutlined/> Создайте трекер
                </Text>
              </Row>
              <Row align={'center'}>
                <Text style={{fontSize: 18}}>
                  <SnippetsOutlined/> Разместите код у себя на сайте
                </Text>
              </Row>
              <Row align={'center'}>
                <Text style={{fontSize: 18}}>
                  <BarChartOutlined/> Отслеживайте статистику
                </Text>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer><Text type={'secondary'}>Created by Demidovich Maxim</Text></Footer>
      </Layout>
    </>
  )
}

export default MainPage
