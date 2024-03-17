import React from 'react'

const Search = ({search , setSearch}) => {
  return (
    <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>

        <label htmlFor="search">search</label>

        <input 
            type='text'
            placeholder='search items'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
      
    </form>
  )
}

export default Search
