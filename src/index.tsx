import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { renderer } from './renderer'

const app = new Hono()
app.get("*", renderer)

app.get('/', (c) => {
  return c.render(<div id="root">pepe</div>)
})

const schema = z.object({
  name: z.string()
})

const apiRoutes = app.post('/api', zValidator('form', schema), (c) => {
  const { name } = c.req.valid('form')
  return c.json({ name })
})

export type ApiRoutes = typeof apiRoutes

export default app
