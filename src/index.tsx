import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { renderer } from './renderer'
import { StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server'
import { routes } from './routes'

const app = new Hono()
app.get("*", renderer)

app.get('*', async (c) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(c.req.raw);
  
  if (context instanceof Response) {
    throw context;
  }
  
  const router = createStaticRouter(dataRoutes, context);
  
  return c.render(
      <StaticRouterProvider router={router} context={context}/>
  )
})

// app.get('/', (c) => {
//   return c.render(<div id="root">pepe</div>)
// })

const schema = z.object({
  name: z.string()
})

const apiRoutes = app.post('/api', zValidator('form', schema), (c) => {
  const { name } = c.req.valid('form')
  return c.json({ name })
})

export type ApiRoutes = typeof apiRoutes

export default app
