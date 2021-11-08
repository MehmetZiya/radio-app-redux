import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Channels from './pages/Channels'
import ChannelDetails from './pages/ChannelDetails'
import Programs from './pages/Programs'
import ProgramDetails from './pages/ProgramDetails'
import Categories from './pages/Categories'
import ProgramsByCategory from './pages/ProgramsByCategory'
import ChannelScedule from './pages/ChannelScedule'
import ChannelsProgram from './pages/ChannelsProgram'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/channels' element={<Channels />} />
        <Route path='/channels/:channelId' element={<ChannelDetails />} />
        <Route
          path='/channels/programs/:channelId'
          element={<ChannelsProgram />}
        />
        <Route path='/schedule/:channelId' element={<ChannelScedule />} />
        <Route path='/programs' element={<Programs />} />
        <Route path='/programs/:programId' element={<ProgramDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route
          exact
          path='/categories/programs/:categoryId'
          element={<ProgramsByCategory />}
        />
      </Routes>
    </div>
  )
}

export default App
