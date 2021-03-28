import React, { useEffect, useState } from 'react';
import { News } from '../news/News';
import fetch from 'node-fetch';
import s from './NewsList.module.scss';

/*eslint-env node, mocha */
const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState(null);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);
      let newsData;
      try {
        const result = await fetch(apiUrl);
        if(!result.ok){
          throw new Error('gekk ekki að sækja gogn');
        }
        newsData = await result.json();
      }catch(e) {
        setError('Gat ekki sótt gögn');
        return;
      }finally {
        setLoading(false);
      }
     setData(newsData);
    }
    getData();
  },[]);
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

  const gogn = data || [];

  return (
      <section className={ s.container }>
          {gogn.length > 0 && gogn.map((result,i) => {
          return (
              <News key={ result.id }
                id={ result.id } 
                limit={ 5 }
              />
          );
        })}
      </section>
  );
}
