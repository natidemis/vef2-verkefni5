import React, { useEffect, useState } from 'react';
import {News} from '../news/News';
const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
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
        newsData = result.json();
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

  let gogn = [];
  if(data){
    gogn = data;
  }
  console.log(gogn.length);
  console.log(JSON.stringify(gogn));
 

  return (
      <section>
        {gogn.length > 0 && gogn.map((result,i) => {
          return (
            <div key={i}>
              <News 
                id={result.id} 
                limit={5}
              />
            </div>
          );
        })}
      </section>
  );
}
