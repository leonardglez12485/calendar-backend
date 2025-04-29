const { response } = require("express");
const Event = require("../models/Event");


const createEvents = async (req, res = response) => {
    const { title, note, start, end } = req.body;
    const event = {
        title,
        note,
        start,
        end,
        user: req.uid,
    };
    try {
        const eventCreated = new Event(event);
        await eventCreated.save();
        res.status(201).json({
            message: "Event created successfully",
            status: "success",
            data: {
                eventCreated
            }
        });
    } catch (error) {
        console.log("Error creating event:", error);
        res.status(500).json({
            message: "Internal server error",
            status: "error",
            error: error.message,
        });
    }
}

const getEvents = async (req, res = response) => {
    const events = await Event
       .find()
       .populate("user", "name");
    res.status(200).json({
        message: "Events retrieved successfully",
        status: "success",
        data: {
            events
        }
    });

}

const updateEvent = async (req, res = response) => {

    const { id } = req.params;
    const userId = req.uid;
   try {
    const event = await Event.findById(id);
    if (!event) {
        return res.status(404).json({
            message: "Event not found",
            status: "error",
        });
    }
    if (event.user.toString() !== userId) {
        return res.status(401).json({
            message: "You are not authorized to update this event",
            status: "error",
        });
    }

    const { title, note, start, end } = req.body;
    const updated = await Event.findByIdAndUpdate(id, { title, note, start, end }, { new: true });
    res.status(200).json({
        message: "Event updated successfully",
        status: "success",
        data: {
            updated
        }
    });
   } catch (error) {
    console.log("Error updating event:", error);
    res.status(500).json({
        message: "Internal server error",
        status: "error",
        error: error.message,
    });
   }
}
const deleteEvent = async (req, res = response) => {
    const userId = req.uid;
    const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
        return res.status(404).json({
            message: "Event not found",
            status: "error",
        });
    }
    if (event.user.toString() !== userId) {
        return res.status(401).json({
            message: "Unauthorized to delete this event",
            status: "error",
        });
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({
        message: "Event deleted successfully",
        status: "success",
    });
  } catch (error) {
    console.log("Error deleting event:", error);
    res.status(500).json({
        message: "Internal server error",
        status: "error",
        error: error.message,
    });
    
  }
}

module.exports = {
    createEvents,
    getEvents,
    updateEvent,
    deleteEvent
}