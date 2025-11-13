import { createClient } from 'contentful'

const space = import.meta.env.CONTENTFUL_SPACE_ID
const token = import.meta.env.CONTENTFUL_DELIVERY_TOKEN

export const client = createClient({
  space: space,
  environment: 'master',
  accessToken: token
})