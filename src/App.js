import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import NewsTicker from './Newsticker';
import Badge from 'react-bootstrap/Badge';
import './App.css';
import { useEffect, useState } from 'react';


export function Fetchapi() {
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const getApi = async () => {
    const response = await fetch("https://inshorts.vercel.app/news/top");
    const json = await response.json();
    const articles = json["data"]["articles"];
    setData(articles);
    setTitles(articles.map(article => article.title));
  };
  
  useEffect(() => {
    getApi();
    setInterval(() => {
      const d = new Date();
      document.getElementById("date").innerHTML = d.toLocaleTimeString();
    }, 1000);

    const interval = setInterval(() => {
      getApi();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <NewsTicker newsItems={titles} />
      <div className="card-container">
        {data.map((article, index) => (
          <Card key={index}>
            <div className='light'><Badge bg="success" style={{ margin: '0px' }}>{article["categoryNames"][0]}</Badge></div>
            <a href={article.sourceUrl} target='__blank'><Card.Img variant="top" src={article.imageUrl} style={{ height: '15rem' }} /></a>
            <Card.Body>
              <Card.Title >{article.title}</Card.Title>
              <Card.Text className='card-desc'>
                {article.content}
              </Card.Text>
              {/* <div className='light fot'>
                <Card.Text>
                  Author Name:- {article.authorName}
                </Card.Text>
              </div> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
    <div className="App">
      <h1><u>Today's Headlines</u></h1>
      <h5 id='date'> </h5>
    </div>
    <Fetchapi />
    </>
  );
}
// style={{ width: '22%', padding: '8px' ,margin: '1rem', border:'2px solid rgb(136 122 122)' , display: 'inline-block', position: 'relative' }}

export default App;
