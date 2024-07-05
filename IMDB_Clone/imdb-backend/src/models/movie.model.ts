import mongoose, { Schema, Document, Model } from "mongoose"

export interface Movie extends Document {
  name: string
  poster: string
  releaseYear: string
  plot: string
  actors: Array<String>
  producer: String
}

const MovieSchema: Schema<Movie> = new Schema<Movie>({
  name: { type: String, required: true },
  poster: { type: String, required: true },
  releaseYear: { type: String, required: true },
  plot: { type: String, required: true },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producer",
    required: true,
  },
})

export const MovieModel: Model<Movie> = mongoose.model<Movie>(
  "Movie",
  MovieSchema
)
