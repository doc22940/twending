import 'styles/global.scss'
import 'assets/fonts/futura'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { cn } from 'ts-classnames'
import React, { FC } from 'react'
import createPersistedState from 'use-persisted-state'

import AppBar from 'components/appBar'
import Head from 'components/head'
import Loading from 'components/loading'
import Repos from 'components/repos'
import * as Select from 'components/select'
import { useRepos } from 'hooks/useRepos'

import { makeOption } from 'utils'

type Period = import('data/period').Option
type Language = import('data/languages').Option

const usePeriod = createPersistedState('period')
const useLanguage = createPersistedState('language')

const Home: FC = () => {
  const [period, setPeriod] = usePeriod<Period>({
    label: 'Monthly',
    value: 'month',
  })

  const [language, setLanguage] = useLanguage<Language>(
    makeOption('All Languages')
  )

  const { repos, fetchMore, loading } = useRepos({
    language: language.value,
    period: period.value,
  })

  return (
    <>
      <Head />
      <main>
        <AppBar>
          <Select.Language
            onChange={setLanguage as () => void}
            value={language}
          />
          <Select.Period
            onChange={setPeriod as () => void}
            value={period}
          />
        </AppBar>
        <h1>Trending Repositories</h1>
        <Repos repos={repos} />
        <div className={cn('mt-6')}>
          {loading ? (
            <Loading />
          ) : (
            <button onClick={fetchMore}>
              Load next {period.value}
            </button>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
