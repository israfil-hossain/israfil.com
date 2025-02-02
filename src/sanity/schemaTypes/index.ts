import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import profile from './profile'
import projects from './projects'
import job from './job'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ profile,projects,job, categoryType, postType, blockContentType, authorType],
}
