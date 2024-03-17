import React , {useState , useEffect} from 'react';
import Header from './Header';
import './index.css';
import Footer from './Footer';
import Content from './Content';
import AddItem from './AddItem';
import Search from './Search';
import apiRequest from './apiRequest';

function App() {

  const API_url ="http://localhost:3500/items"

  const [items , setItems] = useState([])
  const [newItem , setNewItem] = useState('')
  const [search , setSearch]= useState('')
  const [fetchError , setFetchError] = useState(null)
  const [isLoading , setIsLoading] = useState(true)
  


                //fetching API
  useEffect(()=>{
    
    const fetchItems = async()=>{
      try {
        const response = await fetch(API_url)
        if(!response.ok) throw Error ("didn't reseved data")
        const listItem = await response.json()
        setItems(listItem)
        setFetchError(null)


      } catch (err){
        setFetchError(err.message)
      } finally{
        setIsLoading(false)
      }

    }

    setTimeout(()=>{
      fetchItems()
    },500)
    
  },[])

                //adding new item
const addItem = async (item)=>{
    const id = items.length !==0 ? (items[items.length -1].id ).toString() +1 : (1).toString();
    const myNewItem = {id , checked:false , item}
    const listItems = [...items , myNewItem]
    setItems(listItems)


    const postOption ={
      method :'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_url , postOption)
    if(result) setFetchError(result)
}

const addHandler =(e)=> {
  e.preventDefault()
  // console.log("submitted")
  if(!newItem) return;
  addItem(newItem)
  setNewItem('')
}

          //update items
const inputHandler = async (id)=>{
  const newItems = items.map((ele)=> ele.id===id ? {...ele, checked: !ele.checked}: ele)
  setItems(newItems)
  
  const myItem =  newItems.filter((item)=> item.id === id);
  const updateOptions = {
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({checked:myItem[0].checked})
  };
  const reqUrl = `${API_url}/${id}`
  const result = await apiRequest(reqUrl , updateOptions)
  if (result) setFetchError(result)
}

          //delete item
const deleteHandler = async (id)=>{
  const newItems = items.filter((ele)=>ele.id !==id)
  setItems(newItems)

  const deleteOption = {
    method : 'DELETE',
  }
  const reqUrl = `${API_url}/${id}`
  const result = await apiRequest(reqUrl , deleteOption)
  if (result) setFetchError(result)

}

  return (
    <div className="App">
      <Header title="ToDo List"/>


      
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        addHandler={addHandler}
      />

      <Search 
        search={search}
        setSearch = {setSearch}
      />


      <main>
      {fetchError ? 
        <p style={{color: 'red', fontSize:"30px"}}>{`error: ${fetchError}`}</p>
        : 
        (isLoading ? 
          <p>items is loading...</p> 
          : 
          <Content 
          items={items.filter((ele)=> ((ele.item).toLowerCase()).includes(search.toLowerCase()))}
          setItems={setItems}
          inputHandler={inputHandler}
          deleteHandler={deleteHandler}
        />
        ) 
         
         
      }
      
        
      </main>

      <Footer 
        items={items}
      />
    </div>
  );
}

export default App;
