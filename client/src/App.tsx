import {Suspense} from 'react';
import Routes from './routes';

const App = () => {
  return (
    <>
      <Suspense fallback='Loading...'>
        <Routes />
      </Suspense>
    </>
  );
}

export default App;
