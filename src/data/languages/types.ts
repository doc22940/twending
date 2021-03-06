import * as t from 'io-ts'
import { TypeOf } from 'io-ts'

import { all } from './constants'

import { everythingElse, popular } from './list.json'
import { oneOf } from 'lib'

export const AllLanguages = t.literal(all)
export type AllLanguages = typeof all

export const SpecificLanguage = oneOf([
  ...popular,
  ...everythingElse,
])

export type SpecificLanguage = TypeOf<
  typeof SpecificLanguage
>

export const Language = t.union([
  AllLanguages,
  SpecificLanguage,
])
export type Language = TypeOf<typeof Language>

export type OptionType = Record<'label' | 'value', Language>
