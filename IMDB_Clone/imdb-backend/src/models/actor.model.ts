import mongoose, { Schema, Document, Model } from "mongoose"

export interface Actor extends Document {
  name: string
  gender: string
  dob: Date
  bio: string
}

const ActorSchema: Schema<Actor> = new Schema<Actor>({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String, required: true },
})

export const ActorModel: Model<Actor> = mongoose.model<Actor>(
  "Actor",
  ActorSchema
)
