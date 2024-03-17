import React from 'react'

const AddItem = ({newItem ,setNewItem ,addHandler}) => {
  return (
    <form className='addForm' onSubmit ={addHandler}>
        <input 
          id ="addItem"
          type='text'
          placeholder='enter new item'
          required
          value={newItem}
          onChange = {(e)=>setNewItem(e.target.value)}
        />

        <button type='submit'>Add new</button>
      
    </form>
  )
}

export default AddItem
