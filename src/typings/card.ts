import type { movieDetailT } from './tmdb'

export type cardStatesT = 'retry' | 'loadingMovies' | 'loaded'

export type cardTypesT =
  | (movieDetailT & { status: 'loaded'; color: string })
  | {
      status: 'retry' | 'loadingMovies' | 'loadMore'
      color: string
    }
