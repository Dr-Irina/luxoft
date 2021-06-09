import React, { useState, useCallback } from 'react';
import {Select, Table, Input} from 'antd';
import columns, { EType } from "./columns";
// import axios from "axios";
import list from "./list";
import './App.css';
import 'antd/dist/antd.css';


const App = () => {
  // useEffect(() => {
  //   axios.post('http://127.0.0.1:8008/wsrpc', {
  //     "method": "get_data_chunk",
  //     "params": {"size": 10, "offset": 20},
  //     "id": new Date(),
  //     "jsonrpc": "2.0"
  //   }, {
  //     headers: {
  //       'Accept': '*/*'
  //     }
  //   })
  //       .then(response => console.log(response));
  // }, []);
  const [listItem, setListItem] = useState(list);

  const filterSelect = useCallback((options) => {
      setListItem(list.filter(item => item.type === options));
  }, []);
  const filterSearch = useCallback((e) => {
      setListItem(list.filter(item => item.text.includes(e.target.value)));
  }, []);

  const options = [
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
              />
              <div className='search'>
                <Input onChange={filterSearch} placeholder="Поиск" />
              </div>
          </div>
        <Table columns={columns} dataSource={listItem} pagination={false} />
      </div>
  );
}

export default App;
