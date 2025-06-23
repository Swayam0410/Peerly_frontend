import './app2.css'
import Header from './components/Header.jsx'
import Session from './components/Session.jsx'
import { useContext } from 'react';
import DataContext from './components/Context/dataContext.jsx';
const App2=()=>{
  const [data]=useContext(DataContext);
   return( <div className="max-w-7xl mx-auto px-4">
     <Header/>
     <Session arr={data}/>
    </div>);
}
export default App2;