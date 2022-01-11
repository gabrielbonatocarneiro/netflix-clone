
const API_KEY = 'cd540e7abe183a64c53a919a3725b941'
const API_BASE = 'https://api.themoviedb.org/3'

/*
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- ação
- comédia
- terror
- romance
- documentários
*/

const basicFetch = async (endpoint) => {
  const req = await fetch(
    `${API_BASE}${endpoint}language=pt-BR&api_key=${API_KEY}`
  )
  const json = await req.json()
  return json
}

export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch('/discover/tv?with_network=213&'),
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await basicFetch('/trending/all/week?'),
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch('/movie/top_rated?'),
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch('/discover/movie?with_genres=28&'),
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch('/discover/movie?with_genres=35&'),
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch('/discover/movie?with_genres=27&'),
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch('/discover/movie?with_genres=10749&'),
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch('/discover/movie?with_genres=99&'),
      },
    ]
  },

  getMovieInfo: async (movieId, type) => {
    let info = {}

    if (!movieId) return

    switch(type) {
      case 'movie':
          info = await basicFetch(`/movie/${movieId}?`)
        break

      case 'tv':
          info = await basicFetch(`/tv/${movieId}?`)
        break
    }

    return info
  }
}
