import React, { useState, useEffect } from 'react'
import { formatDate, formatUser, handleStatus } from './utils/functions'
import './App.scss'


function App() {
  const [data, setData] = useState([]),
  [pageData, setPageData] = useState([]),
  [page, setPage] = useState(1),
  [maxPage, setMaxPage] = useState(null),
  [perPage, setPerPage] = useState(25)
  console.log(maxPage)
  
  const fetchData = async () => {
    const res = await fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f15021c-fcd4-4657-aff4-2782f62b60b6/test_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T121518Z&X-Amz-Expires=86400&X-Amz-Signature=88c0dd4de2ee4ec1a4a43c548b43962466750f59b78fc32cc3a604a0d7e0599c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"test_data.json"')
    const json = await res.json()
    await setData(json)
  }

  const handleData = async () => {
    await setPageData(data.filter((item, i) => {
      return i >= perPage * (page - 1) && i < perPage * page
    }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(async () => {
    await setMaxPage(Math.ceil(data.length / perPage))
    await handleData()
  }, [data])


  return (
    <div className="App">
      <div className="pagination-wrapper">
        <span>записи {page * perPage - perPage + 1} - {page * perPage}</span>
        <div className="page-selector">
          <span>&laquo;</span>
          <span>&lt;</span>
          <span>{page}</span>
          <span>&gt;</span>
          <span>&raquo;</span>
          по 
        </div>
      </div>
      <div className="list">
        <div className="list-item">
          <div className="list-title">
            <span>Номер / Дата</span>
          </div>
          <div className="list-title">
            <span>Тип задания / Автор</span>
          </div>
          <div className="list-title">
            <span>Аккаунт / Терминал</span>
          </div>
          <div className="list-title">
            <span>Статус</span>
          </div>
        </div>
        {pageData.map((item, i) => {
          return (
            <div key={'item-'+ i} className="list-item">
              <div key={i} className="col">
                <span className="item-title">№{item.id}</span>
                <span className="item-subtitle">{formatDate(item.created_date)}</span>
              </div>

              <div className="col">
                <span className="item-title">{item.order_type.name}</span>
                <span className="item-subtitle">{formatUser(item.created_user)}</span>
              </div>
              <div className="col">
                <span className="item-title">{item.account.name}</span>
                <span className="item-subtitle">{item.terminal.name}</span>
              </div>
              <div className="col">
                <span className={item.status + ' item-status'}>{handleStatus(item.status)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;
