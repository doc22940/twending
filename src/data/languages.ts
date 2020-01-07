import { flatten, map } from 'fp-ts/lib/Array'
import { getOrElse } from 'fp-ts/lib/Option'
import { lookup } from 'fp-ts/lib/Record'
import { constant } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

import {
  colors,
  everythingElse,
  popular,
} from 'data/languages.json'
import theme from 'data/theme'
import { makeOption } from 'utils'

export const getColor = (language: string) =>
  pipe(
    lookup(language, colors),
    getOrElse(constant(theme.colors.gray[400]))
  )

export const options = pipe(
  [['All Languages'], popular, everythingElse],
  flatten,
  map(makeOption)
)
