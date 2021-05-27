import React, {useEffect, useRef, useState} from 'react'
import {Button, Divider, Layout, List, Typography} from 'antd';
import {Header} from "../../components";
import {tracker} from "../../api";
import {Line} from 'react-chartjs-2';
import {Link} from "react-router-dom";
import moment from "moment";

const {Footer, Content} = Layout;
const {Text, Title} = Typography;

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
          trackerData = res;
          inspectHandler('', false)
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
  }, [match.params.id])

  function inspectHandler(path, filter=true) {
    refChart.current.scrollIntoView()
    let data = []
    if (filter){
      data = trackerData.byDays.filter(el => el.path === path);
    }else{
      data = trackerData.byDays;
    }
    for (let i = 0; i < 31; i++) {
      let date = moment().subtract(i, "days").format('DD-MM-YYYY')
      let record = data.find(el => moment(el.day).format('DD-MM-YYYY') === date)
      if (record !== null && record !== undefined) {
        continue;
      }
      data.push({
        day: moment().subtract(i, "days").format(),
        viewcount: 0
      })
    }
    data.sort((a,b) => moment(a.day) > moment(b.day))
    console.log(data);
    setData({
      labels: data.map(el => {
        return moment(el.day).format('DD-MM-YYYY')
      }),
      datasets: [
        {
          label: filter?`Path: ${path}`:'Last month',
          data: data.map(el => el.viewcount),
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
                    key={item.path}
                    actions={[
                      <Button onClick={() => {
                        inspectHandler(item.path)
                      }}>
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
          <Button onClick={()=>inspectHandler('', false)}>Last month</Button>
          <div ref={refChart}>
            <Line data={data} options={options}/>
          </div>

        </Content>
        <Footer><Text type={'secondary'}>Created by Demidovich Maxim</Text></Footer>
      </Layout>
    </>
  )
}

export default Tracker
