import api from "./api";

async function createNewEntry(formData){
    const response = await api.post('/entries', formData)
    return response.data
}

async function getAllPublicEntries(){
    const response = await api.get("/entries")
    return response.data
}

async function getAllMyEntries(){
    const response = await api.get("/entries/my-entries")
    return response.data
}

export {createNewEntry,
        getAllPublicEntries,
        getAllMyEntries
    }