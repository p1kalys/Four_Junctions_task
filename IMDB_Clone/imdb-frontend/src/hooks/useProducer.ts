import { useState, useEffect } from "react"
import producerService from "../services/producer.services"
import { Producer, ProducerResponse } from "../types/producer"
import { AxiosResponse } from "axios"
import { useAppDispatch, useAppSelector } from "./useRedux"
import { addAllProducers, addOneProducer } from "../store/slice/producerSlice"

const useProducer = () => {
  const [producer, setProducer] = useState<Producer | null>(null)
  const [newProducer, setNewProducer] = useState<ProducerResponse | null>(null)
  const producersArr = useAppSelector((state) => state.producerSlice).producers
  const dispatch = useAppDispatch()

  const insertProducer = (producer: Producer) => {
    setProducer(producer)
  }

  useEffect(() => {
    const fetchAllProducers = async () => {
      if (producersArr == null) {
        await producerService.getAllProducers()
          .then((response: AxiosResponse<Array<ProducerResponse>>) => {
            const ProducerResponse: Array<ProducerResponse> = response.data
            dispatch(addAllProducers(ProducerResponse))
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }
    const insertProducer = async () => {
      if (producer) {
        await producerService.insertProducer(producer)
          .then((response: AxiosResponse<ProducerResponse>) => {
            const producerResponse: ProducerResponse = response.data
            dispatch(addOneProducer(producerResponse))
            setNewProducer(producerResponse)
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }

    fetchAllProducers()
    insertProducer()
  }, [producer])

  return { newProducer, producersArr, insertProducer }
}

export default useProducer
