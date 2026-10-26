
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

function CreateEntry() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false
  })

  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, type, value, checked } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const token = localStorage.getItem("token")

      await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/entries`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/my-entries")
    } catch (error) {
    console.log("Error:", error.response?.data || error.message)
    setError(error.response?.data?.message || "Failed to create entry")
    }
  }

  return (
    <div>
      <h1>Create Entry</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div>
          <label htmlFor="entryBody">Entry Body</label>
          <textarea
            id="entryBody"
            name="entryBody"
            value={formData.entryBody}
            onChange={handleChange}
            maxLength={350}
          />
        </div>

        <div>
          <label htmlFor="isPublic">Public Entry</label>
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Create Entry</button>
      </form>
    </div>
  )
}

export default CreateEntry
