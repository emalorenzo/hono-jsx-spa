import { hc } from 'hono/client'
import { useState } from 'react'
import ReactDom from 'react-dom/client'
import type { ApiRoutes } from '.'

const client = hc<ApiRoutes>('/')

function App() {
  const [name, setName] = useState('no name')
  const action = async (formData: FormData) => {
    const res = await client.api.$post({
      form: {
        name: formData.get('name') ?? name
      }
    })
    const data = await res.json()
    setName(data.name)
  }

  return (
    <>
      <h1>Hello {name}!!</h1>
      <form action={action}>
        <input name="name" autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

ReactDom.hydrateRoot(document.getElementById('root') as HTMLElement, <App />)
