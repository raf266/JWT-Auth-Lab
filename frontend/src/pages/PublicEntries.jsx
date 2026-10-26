
import { getAllPublicEntries } from "../services/entryService"
import { useState, useEffect } from "react"

function PublicEntries() {
    const [entries, setEntries] = useState([])

    async function getEntries() {
        const response = await getAllPublicEntries()
        setEntries(response)
    }

    useEffect(() => {
        getEntries()
    }, [])

    return (
        <div>
            <h1>Public Entries</h1>

            {entries.length === 0 ? (
                <p>No Entries made yet</p>
            ) : (
                entries.map((entry) => (
                    <div key={entry._id}>
                        <h2>{entry.title}</h2>
                        <p>{entry.entryBody}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default PublicEntries
