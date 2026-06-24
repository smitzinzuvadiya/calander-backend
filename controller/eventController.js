import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user.id });
        return res.status(200).json({ events })

    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

export const createEvent = async (req, res) => {
    try {
        const { title, description, date, time } = req.body;
        if (!title || !date) {
            return res.status(400).json({ message: "title and date are required" });
        }
        const event = await Event.create({
            userId: req.user.id,
            title,
            description,
            date,
            time
        })
        return res.status(201).json({ event });

    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: "event not found" });
        }
        return res.status(200).json({ event });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deletedEvent) {
            return res.status(404).json({ message: "event not found" });
        }
        return res.status(200).json({ message: "event deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
