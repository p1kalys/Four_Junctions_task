import http from "../Utils/http-common"
import {
  ALL_PRODUCER_ENDPOINT,
  INSERT_PRODUCER_ENDPOINT,
} from "../constants/strings"
import { Producer, ProducerResponse } from "../types/producer"

class ProducerService {
  getAllProducers() {
    return http.get<Array<ProducerResponse>>(ALL_PRODUCER_ENDPOINT)
  }
  insertProducer(producer: Producer) {
    return http.post<ProducerResponse>(INSERT_PRODUCER_ENDPOINT, producer)
  }
}

const producerService = new ProducerService();

export default producerService;
