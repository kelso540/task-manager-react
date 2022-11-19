import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';    
import { useSpring, animated as s} from 'react-spring';
import { UserContext } from './context/UserContext';

export default function Main({input, display, saveInput, addToList, list, openListAdd, displaySet, deleteItems}) {

    const springLeft = useSpring({
        from: {right: -40}, 
        right: 30, 
        config: {mass: 1, tension: 30, friction: 10},
    });

    const {showDelete, newList} = useContext(UserContext); 

  return (
    <div>
        <div className='headDiv'>
            <h1>Your Task Manager</h1>
        </div>
        <div className='headInfo'>
            <h2>Start making your list!</h2>
            <h2>Click the plus to add a task!</h2>
        </div>
        <div className='list'>
                {newList}
        </div>
        <div className={(showDelete)? 'deleteDiv' : 'displayNone'}>
                <button className='deleteBtn' onClick={deleteItems}>Delete</button>
             </div>
        <div className={(display) ?'addTaskDiv' :'displayNone'}>
            <FontAwesomeIcon icon={faX} size='1x' className='x' onClick={displaySet} />
            <h4>Yay! Type you task below!</h4>
            <input type='text' placeholder='Type here' className='inputBox' onChange={saveInput} value={input}/>
            <button className='addTaskButton' onClick={addToList}>Add to list</button>
        </div>
        <s.div style={{...springLeft}} className='addButton'>
            <FontAwesomeIcon icon={faPlus} size='3x' onClick={openListAdd} />
        </s.div>
    </div>
  )
}
