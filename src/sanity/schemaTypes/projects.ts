import { defineField, defineType } from 'sanity'
import { BulbOutlineIcon } from "@sanity/icons";

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to focus on specific parts of the image
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'stack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent', // Use a block content type if you want rich text support
    }),
  ],
})
