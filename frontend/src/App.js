import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Channels from './pages/Channels'
import ChannelDetails from './pages/ChannelDetails'
import Programs from './pages/Programs'
import ProgramDetails from './pages/ProgramDetails'
import Categories from './pages/Categories'
import ProgramsByCategory from './pages/ProgramsByCategory'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Route exact path='/channels' component={Channels} />
        <Route exact path='/channels/:channelId' component={ChannelDetails} />
        <Route exact path='/programs' component={Programs} />
        <Route exact path='/programs/:programId' component={ProgramDetails} />
        <Route exact path='/categories' component={Categories} />
        <Route
          exact
          path='/categories/programs/:categoryId'
          component={ProgramsByCategory}
        />
      </Router>
    </div>
  )
}

export default App
