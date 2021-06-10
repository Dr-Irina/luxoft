import React, { useState, useEffect, useCallback } from 'react';
import { Select, Table, Input, Button } from 'antd';
import { w3cwebsocket } from 'websocket';
import columns, { EType } from "./columns";
import './App.css';
import 'antd/dist/antd.css';

type TListItem = {
    type: string
    text: string
    date: string
}

const client = new w3cwebsocket('ws://127.0.0.1:8008/wsrpc');
const App = () => {
  const [listItem, setListItem] = useState<TListItem[]>([]);
  const [fullList, setFullList] = useState<TListItem[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState(EType.ALL);

  const send = () => {
      client.send(JSON.stringify({
          id: +Date.now(),
          method: 'get_data_chunk',
          params: {offset: 0, size: 10000},
      }));
  }
  const parseList = (tmpList: string[]) => {
      const parse = tmpList.map(item => {
          const splitArr = item.split(' ');
          const type = splitArr[0].toLowerCase().slice(1, -1);
          const date = splitArr[1].slice(1, -1);
          const text = splitArr.slice(2).join(' ');
          return { type, text, date };
      })
      setFullList(parse);
      setListItem(parse);
  }
  useEffect(() => {
    client.onopen = () => send();
    client.onmessage = (message: any) => {
        const mParse = JSON.parse(message.data);
        if (mParse.result.ok) {
            parseList(window.atob(mParse.result.ok).split('\n').filter(item => item.length > 0));
        }
    }
  }, []);

  const filterSelect = useCallback((options) => {
      setSelectVal(options);
  }, []);
  const filterInput = useCallback((e) => {
      setInputVal(e.target.value);
  }, []);
  const filter = useCallback(() => {
      const filterArr = fullList.filter(item => item.text.includes(inputVal));
      setListItem(selectVal === EType.ALL ? filterArr : filterArr.filter(item => item.type === selectVal));
  }, [fullList, inputVal, selectVal]);

  const clearFilters = useCallback(() => {
      setInputVal('');
      setSelectVal(EType.ALL);
      send();
  }, []);
  const options = [
      {value: EType.ALL, label: EType.ALL},
      {value: EType.ERROR, label: EType.ERROR},
      {value: EType.WARNING, label: EType.WARNING},
      {value: EType.INFO, label: EType.INFO},
      {value: EType.DEBUG, label: EType.DEBUG}
      ];
  return (
      <div className="App">
          <div className='filters'>
              <Select
                  options={options}
                  placeholder="Выбери тип"
                  onSelect={filterSelect}
                  value={selectVal}
              />
              <div className='search'>
                <Input onChange={filterInput} placeholder="Поиск" value={inputVal} />
              </div>
          </div>
          <div className='btnContainer'>
              <Button type='primary' onClick={clearFilters} className='btnMargin'>Сбросить фильтры</Button>
              <Button type='primary' onClick={filter}>Найти</Button>
          </div>
        <Table columns={columns} dataSource={listItem} pagination={false} />
      </div>
  );
}

export default App;
