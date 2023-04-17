import {Suspense} from 'react';
import Layout from './components/layout';
import Routes from './routes';

const App = () => {
  return (
    <Layout>
      <Suspense fallback='Loading...'>
        <Routes />
      </Suspense>
    </Layout>
  );
}

export default App;
