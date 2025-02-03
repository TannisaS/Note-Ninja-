import { useState } from 'react'
import BackgroundPaths from './components/backgroundpath'
import ChatInput from './components/input'
import FloatingNav from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FloatingNav/>
    <div className="mt-[10%]">

      <BackgroundPaths 
        title="Your Custom Title"  // Optional prop
      />
    </div>
      {/* <ChatInput/> */}
      
      {/* Your existing content can stay here */}
  

    </>
  )
}

export default App