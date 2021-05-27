import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Layout, message, Modal, Space, Table, Typography} from 'antd';
import {Header} from "../../components";
import {tracker} from "../../api";
import {Link} from "react-router-dom";

const {Footer, Content} = Layout;
const {Text} = Typography;

function TrackerList() {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])
  let [currentTracker, setCurrentTracker] = useState({url: '', name: ''})
  let [modalVisible, setModalVisible] = useState(false)
  let [codeVisible, setCodeVisible] = useState(false)
  let [code, setCode] = useState(false)
  let [mode, setMode] = useState('')
  useEffect(() => {
    tracker.getTrackers()
      .then(
        res => {
          setData(res)
          setLoading(false)
        }
      ).catch(
      err => {
        setLoading(false)
        console.log(err)
      }
    )
  }, [])

  function errorHandler(err) {
    setLoading(false)
    console.log(err.response.data);
    message.error(err.response.data);

  }

  function deleteTrackerHandler(id) {
    setLoading(true)
    tracker.deleteTracker(id)
      .then(
        res => {
          tracker.getTrackers()
            .then(
              res => {
                console.log(res);
                setData(res)
                setLoading(false)
              }
            ).catch(errorHandler)
        }
      )
      .catch(errorHandler)
  }

  function onCancelHandler() {
    setModalVisible(false)
    setCurrentTracker({
      url: '',
      name: ''
    })
  }

  function addTracker() {
    setLoading(true)
    tracker.addTracker(currentTracker)
      .then(
        res => {
          tracker.getTrackers()
            .then(
              res => {
                console.log(res);
                setData(res)
                setLoading(false)
              }
            ).catch(errorHandler)
        }
      )
      .catch(errorHandler)
  }

  function editTracker() {
    setLoading(true)
    tracker.editTracker(currentTracker)
      .then(
        res => {
          tracker.getTrackers()
            .then(
              res => {
                console.log(res);
                setData(res)
                setLoading(false)
              }
            ).catch(errorHandler)
        }
      )
      .catch(errorHandler)
  }

  function onOkHandler() {
    if (mode === 'add') {
      addTracker()
    } else {
      editTracker()
    }
    setModalVisible(false)
  }

  function showCodeHandler(id) {
    setCode(
`<script>
  let host = "${window.location.href.split('//')[1].split('/')[0]}"
  let r = Math.random().toString(36).substring(7);
  let trackerId = ${id};
  let path = window.location.href.split('//')[1].split('/').splice(1).join('/').split("#")[0].split('?')[0];
  if (path[path.length-1] === '/'){
    path = path.substring(0, path.length-1)
  }
  if(path == ""){
    path = '/'
  }
  let img = new Image();
  img.src = "http://"+host+"/api/record/pixel.png?path="+path+"&trackerId="+trackerId+"&r="+r
  document.body.appendChild(img);
</script>
`
    )

    setCodeVisible(true)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: id => <>
        <Space>
          <Button type={'danger'} onClick={() => {
            deleteTrackerHandler(id)
          }}>Delete</Button>
          <Button type={'primary'} onClick={() => {
            setMode('edit')
            setModalVisible(true)
            setCurrentTracker(
              data.filter(el => el.id === id)[0]
            )
          }}>
            Edit
          </Button>
          <Button type={'primary'} onClick={() => {showCodeHandler(id)}}>
            Get code
          </Button>
          <Link to={'/trackers/' + id}><Button type={'primary'}>View</Button></Link>
        </Space>
      </>,
    }
  ];


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
          <Button
            style={{marginBottom: '10px'}}
            onClick={() => {
              setCurrentTracker({url: '', name: ''})
              setModalVisible(true)
              setMode('add')
            }}
          >
            Add
          </Button>
          <Table dataSource={data} columns={columns} loading={loading}/>

        </Content>
        <Footer><Text type={'secondary'}>Created by Demidovich Maxim</Text></Footer>
      </Layout>
      <Modal
        visible={modalVisible}
        title="Title"
        onOk={onOkHandler}
        onCancel={onCancelHandler}
      >
        <Form>
          <Form.Item
            label="Name"
          >
            <Input
              onChange={e => setCurrentTracker({...currentTracker, name: e.target.value})}
              value={currentTracker.name}
            />
          </Form.Item>
          <Form.Item
            label="URL"
          >
            <Input
              onChange={e => setCurrentTracker({...currentTracker, url: e.target.value})}
              value={currentTracker.url}
            />
          </Form.Item>
        </Form>

      </Modal>
      <Modal
        visible={codeVisible}
        title="Code"
        onOk={() => {setCodeVisible(false)}}
        onCancel={() => {setCodeVisible(false)}}
      >
        <Input.TextArea value={code}/>
      </Modal>
    </>
  )
}

export default TrackerList
