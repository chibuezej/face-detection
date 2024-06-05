import './App.css'
import Header from './components/header/Header'
import Main from './components/main/main'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow py-6 flex items-center justify-center">
        <Main />
      </div>
      <div className="py-4">
        <h2 className="py-6 px-20 text-[14px] font-normal text-[#8C8CA1]">
          POWERED BY <span className="text-lg font-medium text-[#0E0E2C]">Getlinked.AI</span>
        </h2>
      </div>
    </div>
  )
}

export default App
