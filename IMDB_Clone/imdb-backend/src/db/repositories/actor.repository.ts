import { ActorModel } from "../../models/actor.model"

export const getActors = () => ActorModel.find();
export const createActor = (values: Record<string, any>) => new ActorModel(values).save().then((Actor) => Actor.toObject());