
import { useState, useEffect } from "react"
import axios from "axios"

function MyEntries() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchMyEntries() {
      try {
        const token = localStorage.getItem("token")

        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/entries/my-entries`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setEntries(response.data)
      } catch (error) {
        setError("Failed to load entries")
      } finally {
        setLoading(false)
      }
    }

    fetchMyEntries()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>My Entries</h1>

      {entries.length === 0 ? (
        <p>No Entries made yet</p>
      ) : (
        entries.map((entry) => (
          <div key={entry._id}>
            <h2>{entry.title}</h2>
            <p>{entry.entryBody}</p>
            <p>{entry.isPublic ? "Public" : "Private"}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MyEntries
