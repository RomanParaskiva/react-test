import React from 'react'
import { formatDate, formatUser, handleStatus } from '../utils/functions'

export const List = ({list}) => {
    return(
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
        {list && list.map((item, i) => {
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
    )
}
