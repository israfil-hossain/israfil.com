import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import profile from './profile'
import project from './project'
import job from './job'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ profile,project,job, categoryType, postType, blockContentType, authorType],
}
