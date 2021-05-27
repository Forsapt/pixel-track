import React, {useEffect, useState} from "react"
import {Button, Layout} from "antd";
import {Logo} from "../";
import {user} from '../../api'
import {Username} from "./styled";

const AntdHeader = Layout.Header;

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
          <Username>
            {username}
          </Username>
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
