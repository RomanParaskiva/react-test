import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.scss'
import { List } from './components/List'


function App() {
  const [data, setData] = useState([]),
    [pageData, setPageData] = useState([]),
    [page, setPage] = useState(1),
    [maxPage, setMaxPage] = useState(null),
    [perPage, setPerPage] = useState(25)

  const fetchData = async () => {
    const res = await fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f15021c-fcd4-4657-aff4-2782f62b60b6/test_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T121518Z&X-Amz-Expires=86400&X-Amz-Signature=88c0dd4de2ee4ec1a4a43c548b43962466750f59b78fc32cc3a604a0d7e0599c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"test_data.json"')
    const json = await res.json()
    await setData(json)
    await setMaxPage(Math.ceil(json.length / perPage))
  }

  const handleData = async () => {
    await setPageData(data.filter((item, i) => {
      return i >= perPage * (page - 1) && i < perPage * page
    }))
  }

  const handleSelect = async (e) => {
    await setPerPage(e.target.value)
    await setMaxPage(Math.ceil(data.length / e.target.value))
    await setPage(1)
  }

  const goMax = async () => {
    await setPage(maxPage)
  }

  const goMin = async () => {
    await setPage(1)
  }

  const nextPage = async () => {
    if (page < maxPage) {
      await setPage(page + 1)
    }
  }

  const prevPage = async () => {
    if (page > 1) {
      await setPage(page - 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    handleData()
  }, [data])

  useEffect(() => {
    handleData()
  }, [page, perPage])


  return (
    <Router>
      <div className="App">
        <div className="pagination-wrapper">
          <span>записи {page * perPage - perPage + 1} - {page * perPage}</span>
          <div className="page-selector">
            <span className={page === 1 ? 'disable' : 'active'} onClick={goMin}>&laquo;</span>
            <span className={page === 1 ? 'disable' : 'active'} onClick={prevPage}>&lt;</span>
            <span>{page}</span>
            <span className={page === maxPage ? 'disable' : 'active'} onClick={nextPage}>&gt;</span>
            <span className={page === maxPage ? 'disable' : 'active'} onClick={goMax}>&raquo;</span>
          </div>
          <span>по</span>
          <select onChange={handleSelect}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>записей</span>
        </div>
        <List list={pageData} />
      </div>
    </Router>
  )
}

export default App;
