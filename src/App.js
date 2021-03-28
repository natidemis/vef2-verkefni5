// TODO sækja og setja upp react router

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
      <div>
          <h1>Rúv Fréttir</h1>
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" component = { Index }></Route>
                  <Route exact path="/news/:id" component={ NewsPage }></Route>
                  <Route  component= { NotFound } />
              </Switch>
          </BrowserRouter>
          <hr/>
          <p>Fréttir frá 
              <a href= "https://ruv.is" rel="noreferrer"> RUV</a>
          </p> 
      </div>
  );
}
