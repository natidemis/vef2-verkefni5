// TODO sækja og setja upp react router

import { Layout } from './components/layout/Layout';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/:id" component={NewsPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}
