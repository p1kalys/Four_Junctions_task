import { ProducerModel } from "../../models/producer.model"

export const getProducers = () => ProducerModel.find();
export const createProducer = (values: Record<string, any>) => new ProducerModel(values).save().then((Producer) => Producer.toObject());