import { useState, useEffect } from 'react';
import './App.css'

function YearTable(props) {
  console.log('YearTable', props);

  return (
      <div>
          <h2>Year Table</h2>
          <table>
              <tr>
                  <th>Year</th>
                  <th>Amount</th>
              </tr>
              {props.list.map(item => (
                  <tr>
                      <td>{item.year}</td>
                      <td>{item.amount}</td>
                  </tr>
              ))}
          </table>
      </div>
  );
};

function SortTable(props) {
  console.log('SortTable', props);

  return (
      <div>
          <h2>Sort Table</h2>
          <table>
              <tr>
                  <th>Date</th>
                  <th>Amount</th>
              </tr>
              {props.list.map(item => (
                  <tr>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                  </tr>
              ))}
          </table>
      </div>
  );
};

function MonthTable(props) {
  console.log('MonthTable', props);

  return (
      <div>
          <h2>Month Table</h2>
          <table>
              <tr>
                  <th>Month</th>
                  <th>Amount</th>
              </tr>
              {props.list.map(item => (
                  <tr>
                      <td>{item.month}</td>
                      <td>{item.amount}</td>
                  </tr>
              ))}
          </table>
      </div>
  );
};

function withDataProcessing(WrappedComponent) {
  return class extends React.Component {
      processData = (list) => {
          // Преобразование данных и сортировка
          // Здесь можно добавить необходимую логику обработки данных
          const processedList = list.sort((a, b) => {
              // Сортируем по дате или по году, в зависимости от переданного компонента
              if (WrappedComponent === SortTable) {
                  return new Date(a.date) - new Date(b.date);
              } else if (WrappedComponent === YearTable) {
                  return a.year - b.year;
              }
          });

          return processedList;
      };

      render() {
          const processedList = this.processData(this.props.list);

          return <WrappedComponent {...this.props} list={processedList} />;
      }
  };
}

function App() {
//  export default class App extends React.Component {
  const [state, setState] = useState({
    list: []
  })

  const fetchLists = async() => {
    try {
      debugger
      const responce = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json`)
      if (!responce.ok) {
        throw new Error('Ошибка сервера')
      }
  
      const data = await responce.json();
      setState(data);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLists();
  }, [])

  // Обертка компонента YearTable
  const YearTableWithProcessing = withDataProcessing(YearTable);
  
  // Обертка компонента MonthTable
  const MonthTableWithProcessing = withDataProcessing(MonthTable);
  
  // Обертка компонента SortTable
  const SortTableWithProcessing = withDataProcessing(SortTable);

  return (
    <div>
      <MonthTableWithProcessing list={state.list} />
      <YearTableWithProcessing list={state.list} />
      <SortTableWithProcessing list={state.list} />
    </div>
  )
}

export default App
