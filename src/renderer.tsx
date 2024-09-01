import { reactRenderer } from '@hono/react-renderer'

import { Script } from './components/script'

declare module '@hono/react-renderer' {
  interface Props {
    title: string
  }
}

export const renderer = reactRenderer(({ children }) => {
  return (
    <html>
      <head>
        <script type="module" src="/src/client.tsx" />
      </head>
      <body>{children}</body>
    </html>
  )
})
