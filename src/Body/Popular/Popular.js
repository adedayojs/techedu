import React from 'react';

import './Popular.css';

function Welcome({ data, heading, text }) {
  console.log(text, heading);
  return (
    <section id="popular" className="flex-column main-center cross-center">
      <div className="welcome-heading">
        <h1>{heading}</h1>
        <p className="welcome-text">{text}</p>
      </div>
      <div className="flex space-between welcome-items popular-items">
        {data.map(item => (
          <div className="popular-div" key={item.id}>
            <img
              className="popular-image"
              src={item.icon}
              alt={item.description}
            />
            <h3 className="school">{item.name}</h3>
            <p className="school-detail">
              {item.description.length > 250
                ? item.description.slice(0, 250) + '......'
                : item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Welcome;
