import React, {useEffect, useRef, useState} from 'react'
import {Button, Divider, Layout, List, Typography} from 'antd';
import {Header} from "../../components";
import {tracker} from "../../api";
import { Line  } from 'react-chartjs-2';
import {Link} from "react-router-dom";

const {Footer, Content} = Layout;
const {Text, Title} = Typography;

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(132, 99, 255)',
      borderColor: 'rgba(132, 99, 255, 0.5)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function Tracker({match}) {
  let refChart = useRef(null);
  let [loading, setLoading] = useState(true)
  let [trackerData, setTrackerData] = useState({})
  let [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '.',
        data: [],
        fill: false,
        backgroundColor: 'rgb(132, 99, 255)',
        borderColor: 'rgba(132, 99, 255, 0.5)',
      },
    ],
  })

  useEffect(() => {
    tracker.getTracker(match.params.id)
      .then(
        res => {
          console.log(res);
          setTrackerData(res)
          setLoading(false)
        }
      ).catch(
      err => {
        setLoading(false)
        console.log(err)
        window.location.href = '/trackers'
      }
    )
  }, [])

  function inspectHandler(path) {
    refChart.current.scrollIntoView()
    setData({
      labels: trackerData.byDays.filter(el => el.path === path).map(el => {
        let date = new Date(el.day)
        return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
      }),
      datasets: [
        {
          label: "Path: " + path,
          data: trackerData.byDays.filter(el => el.path === path).map(el => el.viewcount),
          fill: false,
          backgroundColor: 'rgb(132, 99, 255)',
          borderColor: 'rgba(132, 99, 255, 0.5)',
        },
      ],
    })
  }

  return (
    <>
      <Layout>
        <Header/>
        <Content
          style={{
            padding: 32,
            margin: 0,
            minHeight: 'calc(100vh - 134px)'
          }}
        >
          <Link to={'/trackers'}>Back</Link>

          <List
            size={'small'}
            loading={loading}
            header={<Title level={2}>Popular pages</Title>}
            bordered
            dataSource={trackerData.statistics}
            renderItem={item => {
              return (
                <>
                  <List.Item
                    actions={[
                      <Button onClick={() => {inspectHandler(item.path)}}>
                        Inspect
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={<Title level={5}>{item.path}</Title>}
                      description={`Views: ${item.viewcount}`}
                    />
                  </List.Item>
                  <Divider/>
                </>
              )
            }}
          />
          <div  ref={refChart}>
            <Line  data={data} options={options} height={70}/>

          </div>

        </Content>
        <Footer><Text type={'secondary'}>Created by Demidovich Maxim</Text></Footer>
      </Layout>
    </>
  )
}

export default Tracker
