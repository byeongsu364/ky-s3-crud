import { useState, useRef } from 'react'
import './App.css'
import FileList from "./components/FileList"
import UploadForm from "./components/UploadForm"

function App() {

  const listRef = useRef(null)
  const reload = ()=>listRef.current?.load?.()
  return (
    <div className='container'>
      <UploadForm onDone={reload}/>
      <FileList ref={listRef}/>
    </div>
  )
}

export default App
