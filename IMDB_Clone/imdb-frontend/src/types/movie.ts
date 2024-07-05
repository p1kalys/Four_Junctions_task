export type Movie = {
  name: string
  poster: string
  releaseYear: string
  plot: string
  actors: Array<string>
  producer: string
}

export type MovieResponse = {
  _id: string
  name: string
  poster: string
  releaseYear: string
  plot: string
  actors: Array<string>
  producer: string
}
