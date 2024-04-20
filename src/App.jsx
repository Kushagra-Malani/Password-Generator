import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*-_+=[]{}~`"
    }

    for (let i = 0; i<length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length, numAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)

    passwordRef.current?.select()
  })

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator]) 
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-center text-orange-400 bg-gray-600'>
        <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>

        <div className='flex rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none rounded-md w-full py-1 px-3' placeholder='Hello' ref={passwordRef} readOnly />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white mx-2 rounded-md px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultValue={numAllowed} id='numberInput' onChange={()=>{setNumAllowed((prev) => !prev)}} />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultValue={charAllowed} id='characterInput' onChange={()=>{setCharAllowed((prev) => !prev)}} />
            <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
