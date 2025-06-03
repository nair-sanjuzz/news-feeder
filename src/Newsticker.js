import React from 'react';
import Marquee from 'react-fast-marquee';
import { Container } from 'react-bootstrap';
import './NewsTicker.css';

const NewsTicker = ({ newsItems }) => {
  return (
    <Container fluid className="news-ticker">
      <div className="ticker-wrap">
        <Marquee speed={150}>
          <h2>BREAKING NEWS:</h2>
          {newsItems.map((item, index) => (
            <span key={index} className="ticker-item">
              {item} &nbsp;&nbsp;
            </span>
          ))}
        </Marquee>
      </div>
    </Container>
  );
};

export default NewsTicker;