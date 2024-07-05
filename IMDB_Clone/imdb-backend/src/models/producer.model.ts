import mongoose, { Schema, Document, Model } from "mongoose"

export interface Producer extends Document {
  name: string
  gender: string
  dob: Date
  bio: string
}

const ProducerSchema: Schema<Producer> = new Schema<Producer>({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String, required: true },
})

export const ProducerModel: Model<Producer> = mongoose.model<Producer>(
  "Producer",
  ProducerSchema
)
