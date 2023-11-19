const express = require("express");
const router = express.Router();

// queries
const {
  getAllGuests,
  getGuest,
  createGuest,
  deleteGuest,
  updateGuest,
} = require("../queries/guest.js");

// validations
const {
  checkNameLast,
  checkNameFirst,
  checkBooleanAddress,
  checkBooleanInvite,
  checkBooleanRsvp,
  checkBooleanAttending,
} = require("../validations/checkGuests.js");

// GET ALL GUESTS ROUTE
router.get("/", async (req, res) => {
  try {
    const allGuests = await getAllGuests();
    if (allGuests[0]) {
      res.status(200).json(allGuests);
    } else {
      res.status(500).json({ error: "There was a server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
});

// GET ONE GUEST ROUTE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await getGuest(id);
    if (guest) {
      res.status(200).json(guest);
    } else {
      res.status(404).json({ error: "Guest Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Failed to fetch guest" });
  }
});

// CREATE ROUTE
router.post(
  "/",
  checkNameLast,
  checkNameFirst,
  checkBooleanAddress,
  checkBooleanInvite,
  checkBooleanRsvp,
  checkBooleanAttending,
  async (req, res) => {
    // const body = req.body;
    const guest = await createGuest(req.body);
    res.status(200).json(guest);
  }
);

// UPDATE ROUTE
router.put(
  "/:id",
  checkNameLast,
  checkNameFirst,
  checkBooleanAddress,
  checkBooleanInvite,
  checkBooleanRsvp,
  checkBooleanAttending,
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedGuest = await updateGuest(id, body);
      if (updatedGuest.id) {
        res.status(200).json(updatedGuest);
      } else {
        res.status(404).json({ error: "Guest Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Failed to update guest" });
    }
  }
);

// DELETE ROUTE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGuest = await deleteGuest(id);
    if (deletedGuest.id) {
      res.status(200).json(deletedGuest);
    } else {
      res.status(404).json({ error: "Guest Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Failed to delete guest" });
  }
});

module.exports = router;
