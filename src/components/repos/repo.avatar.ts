import memoize from 'fast-memoize'
import { pipe } from 'fp-ts/lib/pipeable'

import { avatar, link } from './repo.avatar.styles'
import { User } from 'src/pages/api'
const Avatar = ({ url: href, avatar: src }: User) =>
  pipe(avatar({ src }), link({ href }))

export const Skeleton = memoize(
  link(
    avatar({
      src:
        'https://avatars3.githubusercontent.com/u/17836748?v=4',
    })
  )
)
export default memoize(Avatar)
