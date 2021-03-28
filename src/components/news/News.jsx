import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import fetch from 'node-fetch';
const apiUrl = process.env.REACT_APP_API_URL;


export function News({id, limit = 20, back = false }) {
  console.log("news");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(()=>{
    async function getData() {
      setLoading(true);
      const url = `${apiUrl}${id}`;
      let newsData;
      try {
        const result = await fetch(url);
        if(!result.ok){
          throw new Error("náði ekki að sækja gogn");
        }
        newsData = await result.json();
      }catch(e) {
        setError('Gat eki sótt gögn');
      }finally{
        setLoading(false);
      }
      setData(newsData);
    }
    getData();
  },[id]);
  if(error) {
    return (
      <p>{error}</p>
    );
  }
  if(loading) {
    return (
      <p>Er að sækja gögn..</p>
    );
  }
  let news = [];
  if(data && data.items) {
    news = data.items;
  }
  let title = '';
  if(data && data.title) {
    title = data.title;
  }
  
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {news.length > 0 && news.map((result,i)=>{
          if(i < limit) {
            return (
              <li key={i}>
                <a href={result.link}>{result.title}</a>
              </li>
            );
          }
          return (
            false
          );
        })}
      </ul>
      {(back && <Link to="/">Til baka</Link>)||<Link to={id}><strong>Allar Fréttir</strong></Link>}
    </div>
  );
}