import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true }, // Changed from 'file' to 'audio'
});

const playlistModel = mongoose.models.playlist || mongoose.model("playlist", playlistSchema);

export default playlistModel;