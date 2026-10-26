
const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const Entry = require("../models/EntryModel")

router.get("/", async (req, res) => {
  try {
    const publicEntries = await Entry.find({ isPublic: true })

    res.status(200).json(publicEntries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", verifyToken, async (req, res) => {
  try {
    const newEntry = await Entry.create({
      title: req.body.title,
      entryBody: req.body.entryBody,
      isPublic: req.body.isPublic,
      owner: req.user._id
    })

    res.status(201).json(newEntry)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.get("/my-entries", verifyToken, async (req, res) => {
  try {
    const myEntries = await Entry.find({
      owner: req.user._id
    })

    res.status(200).json(myEntries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id)

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found"
      })
    }

    if (entry.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized"
      })
    }

    await Entry.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: "Entry deleted successfully"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id)

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found"
      })
    }

    if (entry.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized"
      })
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: req.body.isPublic
      },
      {
        new: true,
        runValidators: true
      }
    )

    res.status(200).json(updatedEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
