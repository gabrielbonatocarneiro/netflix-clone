import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/index'
import FeaturedMovie from './components/FeaturedMovie/index'
import Header from './components/Header/index'

export default () => {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] =useState(false)

  useEffect(() => {
    const loadAll = async () => {
      // Buscando a lista de filmes e séries
      const list = await Tmdb.getHomeList()
      setMovieList(list)

      let existsBackdropPath = false

      // Existe algumas séries que não tem o backdrop_path(poster), então pulamos ela
      while(!existsBackdropPath) {
        // Selecionamos um destaque aleatório
        const originaisNetflix = list.find(item => item.slug === 'originals')
        const randomChosen = Math.floor(Math.random() * (originaisNetflix.items.results.length - 1))
        const chosen = originaisNetflix.items.results[randomChosen]

        // Pega as informações de uma série aleatória
        const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

        if (chosenInfo && chosenInfo.backdrop_path) {
          existsBackdropPath = true

          setFeaturedData(chosenInfo)
        }
      }
    }

    loadAll()
  }, [])

  useEffect(() => {
    // Controlamos o background black do header, conforme o scroll do mouse
    const scrollListener = () => {
      window.scrollY > 10 ? setBlackHeader(true) : setBlackHeader(false)
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className='page'>
      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, index) => (
          <MovieRow key={index} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> pelo Gabriel Bonato Carneiro, tutoreado pela B7Web<br/>
        Direitos de imagem para Netflix<br/>
        Dadps pegos do site Themoviedb.org
      </footer>

      {/* Loader da aplicação */}
      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando' />
        </div>
      }
    </div>
  )
}
