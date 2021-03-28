import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import s from './News.module.scss';
import PropTypes from 'prop-types';

/*eslint-env node, mocha */
const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  id: PropTypes.string.isRequired,
  limit: PropTypes.number,
  back: PropTypes.bool,
}

export function News({ id, limit = 20, back = false }) {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState(null);

  useEffect(()=>{
    async function getData() {
      setLoading(true);
      const url = `${ apiUrl }${ id }`;
      let newsData;
      try {
        const result = await fetch(url);
        if(!result.ok){
          throw new Error('náði ekki að sækja gogn');
        }
        newsData = await result.json();
      }catch(e) {
        setError('Gat ekki sótt gögn');
      }finally{
        setLoading(false);
      }
      setData(newsData);
    }
    getData();
  },[ id ]);
  if(error) {
    return (
        <div className={ s.cell }>
            <p>{error}</p>
        </div>
    );
  }
  if(loading) {
    return (
        <div className={ s.cell }>
            <p>Er að sækja gögn..</p>
        </div>
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
      <div className={ s.cell }>
          <h2>{title}</h2>
          <ul>
              {news.length > 0 && news.map((result,i)=>{
              if(i < limit) {
                return (
                    <li key={ result.id }>
                        <a href={ result.link } className={ s.cell__text }>{result.title}</a>
                    </li>
                );
              }
              return (
                false
              );
            })}
          </ul>
          {
            (back && <Link to="/" className={ s.cell__text }><strong>Til baka</strong></Link>)
            ||
            <Link to={ `/news/${ id }` } ><strong className={ s.cell__text }>Allar Fréttir</strong></Link>}
      </div>
  );
}