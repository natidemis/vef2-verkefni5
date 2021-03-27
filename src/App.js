// TODO sækja og setja upp react router

import { Layout } from './components/layout/Layout';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
      <BrowserRouter>
        <h1>Rúv Fréttir</h1>
          <Switch>
           <Route exact path="/" component = {Index}></Route>
           <Route path="/:types" children={<NewsPage />}></Route>
           <Route component={NotFound} />
          </Switch>
          <hr/>
          <p>Fréttir frá <a href="https://www.ruv.is/">RÚV</a>.</p>
      </BrowserRouter>
  );
}
