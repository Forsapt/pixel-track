import React, {useEffect, useState} from "react"
import {Button, Layout, Typography} from "antd";
import {Logo} from "../";
import {user} from '../../api'

const AntdHeader = Layout.Header;
const {Text} = Typography;

function Header() {
  let [username, setUsername] = useState('Loading...')
  useEffect(() => {
    user.getUser()
      .then(
        res => {
          setUsername(res.username)
        }
      )
  }, [])
  return (
    <AntdHeader>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Logo/>
        <div
          style={{
            color: '#fff'
          }}
        >
          <span style={{marginRight: '10px'}}>
            {username}
          </span>
          <Button
            onClick={() => {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
              window.location.href = '/'
            }}
          >
            Logout
          </Button>
        </div>

      </div>
    </AntdHeader>
  )
}

export default Header
