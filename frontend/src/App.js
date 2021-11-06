import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Channels from './pages/Channels'
import ChannelDetails from './pages/ChannelDetails'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Route exact path='/channels' component={Channels} />
        <Route exact path='/channels/:channelId' component={ChannelDetails} />
      </Router>
    </div>
  )
}

export default App
