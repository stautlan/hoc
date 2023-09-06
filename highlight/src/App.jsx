import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './css/index.css'

function New(Component) {
  return function(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            <Component {...props} />
        </div>
    )
  }
};

function Popular(Component) {
  return function(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            <Component {...props} />
        </div>
    )
  }
};

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

function List(props) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                const VideoComponent = item.views < 100 ? New(Video) : item.views > 1000 ? Popular(Video) : Video;
                return (
                    <VideoComponent {...item} />
                );

            case 'article':
                const ArticleComponent = item.views < 100 ? New(Article) : item.views > 1000 ? Popular(Article) : Article;
                return (
                    <ArticleComponent {...item} />
                );
        }
    });
};

function App() {
  const [list, setList] = useState([
      {
          type: 'video',
          url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
          views: 50
      },
      {
          type: 'video',
          url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
          views: 12
      },
      {
          type: 'article',
          title: 'Невероятные события в неизвестном поселке...',
          views: 175
      },
      {
          type: 'article',
          title: 'Секретные данные были раскрыты!',
          views: 1532
      },
      {
          type: 'video',
          url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
          views: 4253
      },
      {
          type: 'article',
          title: 'Кот Бегемот обладает невероятной...',
          views: 12,
      },
  ]);

  return (
      <List list={list} />
  );
}

export default App
