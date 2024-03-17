

const apiRequest = async (url="" , optionObj = null , errMsg = null)=>{
    try{
        const respons = await fetch(url , optionObj)
        if(!respons.ok) throw Error ("pleace relode app") 

    }catch(err){
        errMsg = err.message
    }finally{
        return errMsg
    }

}


export default apiRequest;