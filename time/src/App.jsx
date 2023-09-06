import React, { useId, useState } from 'react'
import moment from 'moment'
import './App.css'
import './css/index.css'

function DateTime(props) {
  <p className='date'>{props.date}</p>
}

function withDateTimePretty(Component) {
  return class extends React.Component {
    formatDateTime = (date) => {
      const time = moment.unix(new Date(date));
      const nowTime = moment();

      const duration = moment.duration(time.diff(nowTime));
      if (duration.days() > 1) {
        return duration.days().toString() + " дней назад";
      } else if (duration.hours > 1) {
        return duration.hours().toString() + ' часов назад';
      } else {
        return duration.minutes().toString() + ' минут назад';
      }
    }

    render() {
      const { date, ...otherProps } = this.props;
      const formattedDate = this.formatDateTime(new Date(date));
      return <Component date={formattedDate} {...otherProps} />;
    }
  };
}


function Video({url, date}) {
  const DateTimePretty = withDateTimePretty(DateTime);
  
  const verifiedDiff = () => {
    const time = moment.unix(new Date(date));
    const nowTime = moment();

    const duration = moment.duration(time.diff(nowTime));
    if (duration.days() > 1) {
      return duration.days().toString() + " дней назад";
    } else if (duration.hours > 1) {
      return duration.hours().toString() + ' часов назад';
    } else {
      return duration.minutes().toString() + ' минут назад';
    }
  }

  return (
    <div className='video'>
      <h3>{verifiedDiff()}</h3>
      <iframe src={url} frameBorder='0' 
        allow='autoplay;encrypted-media'
        allowFullScreen
      />
      {/* <DateTime date={date} /> */}
      <DateTimePretty date={date} />
    </div>
  )
}

function VideoList({list}) {
  return list.map((item, index) => (
        <Video key={index} url={item.url} date={item.date} />
      ))
}

function App() {
  const [list, setList] = useState([
    {
        url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2017-07-31 13:24:00'
    },
    {
        url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-03-03 12:10:00'
    },
    {
        url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-02-03 23:16:00'
    },
    {
        url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-01-03 12:10:00'
    },
    {
        url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-01-01 16:17:00'
    },
    {
        url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2017-12-02 05:24:00'
    },
  ]);

  return (
    <>
    <VideoList list={list} />
    </>
  )
}

export default App
