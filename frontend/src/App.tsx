import { Header } from './components';
import { Outlet } from 'react-router-dom';

export function App() {

  return (
    <div className='App'>
      <h1>Vote Pimpim</h1>
      
      {/* Navigation menu */}
      <Header />
      
      {/* Display the content of the current route */}
      <Outlet />

    </div>
  )
}
