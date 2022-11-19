import { useEffect, useState } from 'react';     
import { UserContext } from './context/UserContext';
import './App.css';
import List from './List';
import Main from './Main';

function App() {

  const startList = [
    {
      value: 'This is an example, tasks will fill like this. Click the bullet to complete, and delete to remove.', 
      id: false, 
      count: 0
    }
  ]

  const [input, setInput] = useState(''); 
  const [display, setDisplay] = useState(false); 
  const [list, setList] = useState(startList);
  const [selected, setSelected] = useState(true);  
  const [showDelete, setShowDelete] = useState(false); 
  const [count, setCount] = useState(1); 
  const [deleteCount, setDeleteCount] = useState(0); 
  
  let newList = list.map((item, index)=>{
    return <List key={item.count} item={item.value} count={index} />
  });

  const saveInput = (e) => {
    setInput(e.target.value); 
  };

  const addToList = () => { 
    setCount(count + 1);
    setList(current=>[...current, {
      value: input, 
      id: false, 
      count: count
    }]); 
    setDisplay(false); 
    setInput(''); 
    setTimeout(scrollDown, 100);
  };

  const scrollDown = () => {
    const div = document.querySelector('.list'); 
    div.scrollTop = div.scrollHeight; 
  }

  const openListAdd = () => {
    setDisplay(true);
  };

  const displaySet = () => {
    setDisplay(!display); 
  };

  const deleteItems = () => {
    const newList = list.filter((item, index)=>{
      return item.id === false; 
    })
    setList(newList); 
    setDeleteCount(0);
    setShowDelete(false);
  }

  useEffect(()=>{
    // console.log(input); 
    console.log(list);
  }, [input, list]); 

  return (
    <UserContext.Provider value={{showDelete, setShowDelete, newList, list, selected, setSelected, deleteCount, setDeleteCount}} >
    <div className="App">
      <Main input={input} display={display} saveInput={saveInput} addToList={addToList} list={newList} openListAdd={openListAdd} displaySet={displaySet} deleteItems={deleteItems}/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
