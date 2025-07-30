import { useEffect, useState } from 'react'
import { Game } from '../App'
import Produto from '../components/Produto'
import { useGetJogosQuery } from '../services/api'

import * as S from './styles'

const Produtos = () => {
  const {
    data: jogos,
    isLoading,
    isFetching
  } = useGetJogosQuery(undefined, {
    refetchOnMountOrArgChange: true
  })

  const [showLoading, setShowLoading] = useState(true)
  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false)

  useEffect(() => {
    // Inicia o timer de loading mínimo
    const timer = setTimeout(() => {
      setMinimumLoadingDone(true)
    }, 1500) // 1.5 segundos mínimo

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && !isFetching && minimumLoadingDone) {
      setShowLoading(false)
    } else {
      setShowLoading(true)
    }
  }, [isLoading, isFetching, minimumLoadingDone])

  if (showLoading) return <h2>Carregando...</h2>

  return (
    <S.Produtos>
      {jogos?.map((game) => (
        <Produto key={game.id} game={game} />
      ))}
    </S.Produtos>
  )
}

export default Produtos
