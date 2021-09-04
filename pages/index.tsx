import { useEffect, useState } from 'react'
import Head from 'next/head'
import Error from 'components/Error'
import Output from 'components/Output'

const useStickyState = (defaultValue, key: string) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key)

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue))
    }
  }, [key])

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

const Home = () => {
  const [longLink, setLongLink] = useState('')
  const [longLinks, setLongLinks] = useStickyState([], 'longLinks')
  const [shortLinks, setShortLinks] = useStickyState([], 'shortLinks')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    const response = await fetch(
      'https://api.shrtco.de/v2/shorten?url=' + longLink
    )

    if (!response.ok) {
      setError('The link you entered is invalid.')
      return
    }

    const { result } = await response.json()
    const { original_link, short_link } = result

    setLongLinks((previousLongLinks: string[]) => [
      ...previousLongLinks,
      original_link,
    ])
    setShortLinks((previousShortLinks: string[]) => [
      ...previousShortLinks,
      short_link,
    ])
  }

  return (
    <>
      <Head>
        <title>Link Shortener</title>
      </Head>

      <main className='px-4 py-8 max-w-3xl mx-auto grid gap-y-8'>
        <h1>Link Shortener</h1>

        <span>Shortening a link will take about 30 seconds.</span>

        <input
          value={longLink}
          onChange={(event) => setLongLink(event.currentTarget.value)}
          type='text'
          placeholder='Enter your link'
          className='w-full'
        />

        {error && <Error message={error} />}

        <button onClick={handleSubmit} className='w-full'>
          Shorten
        </button>

        {shortLinks.map((shortLink: string, index: number) => (
          <Output
            longLink={longLinks[index]}
            shortLink={shortLink}
            key={shortLink}
          />
        ))}
      </main>
    </>
  )
}

export default Home
