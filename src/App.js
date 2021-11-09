import React, { useState, useEffect } from 'react'
import { formatDate, formatUser } from './utils/functions'

import './App.scss'


function App() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f15021c-fcd4-4657-aff4-2782f62b60b6/test_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T121518Z&X-Amz-Expires=86400&X-Amz-Signature=88c0dd4de2ee4ec1a4a43c548b43962466750f59b78fc32cc3a604a0d7e0599c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"test_data.json"')
    const json = await res.json()
    console.log(json)
    await setData(json)
  }

  useEffect(() => {
    fetchData()

  }, [])


  return (
    <div className="App">
      <div className="grid">
        <div className="grid-title">
          <span>Номер / Дата</span>
        </div>
        <div className="grid-title">
          <span>Тип задания / Автор</span>
        </div>
        <div className="grid-title">
          <span>Аккаунт / Терминал</span>
        </div>
        <div className="grid-title">
          <span>Статус</span>
        </div>
        {data.map((item, i) => {
          return (
            <>
              <div key={i} className="grid-item">
                <span className="item-title">№{item.id}</span>
                <span className="item-subtitle">{formatDate(item.created_date)}</span>
              </div>
            
              <div className="grid-item">
                <span className="item-title">{item.order_type.name}</span>
                <span className="item-subtitle">{formatUser(item.created_user)}</span>
              </div>
              <div className="grid-item">
                <span className="item-title">{item.account.name}</span>
                <span className="item-subtitle">{item.terminal.name}</span>
              </div>
              <div className="grid-item">
                <span className="item-title">{item.account.name}</span>
                <span className="item-subtitle">{item.terminal.name}</span>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default App;
