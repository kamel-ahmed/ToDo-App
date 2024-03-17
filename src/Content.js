import React, { Fragment }  from 'react'
import { FaTrashAlt } from "react-icons/fa";


const Content = ({items , inputHandler , deleteHandler}) => {


  return (

    <Fragment>
        <ul>

            {items.length ===0 ?
                <div>
                    <h1>there is no tasks yet...</h1>
                    <h1>Add New tasks Todo!!</h1>
                </div>
            :
                items.map((ele)=>(

                    <li className="item" style={{width:"400px"}} key={ele.id}>
                    
                        <input 
                            type="checkbox" 
                            checked={ele.checked}
                            onChange={()=>inputHandler(ele.id)}
                            />
                        <label
                            style={(ele.checked ===true ? {textDecoration:"line-through"}: null)}
                            onDoubleClick={()=>inputHandler(ele.id)}
                        > 
                            {ele.item}
                        </label>

                        <FaTrashAlt 
                            onClick={()=>deleteHandler(ele.id)}
                        />
                    </li>
                ))
            }
        </ul>
    </Fragment>
  )
}

export default Content
