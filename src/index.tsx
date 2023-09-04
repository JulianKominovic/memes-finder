import { useEffect, useState } from 'react'
import {
  type ExtensionPages,
  type ExtensionMetadata
} from 'sittly-devtools/dist/types'
import { type MappedMemes, type Response } from './types'
const { register, api, components, utils, hooks } = window.SittlyDevtools
const { network, clipboard } = api
const { useDebounceFunction } = utils
const { useServices } = hooks
const { Command, Skeleton } = components
const { powerfulFetch, ResponseType } = network

function fetchMemes(query: string, page: number) {
  return powerfulFetch<Response>(
    query === ''
      ? `https://es.memedroid.com/memes/getTopItems/ever?page=${page}&_=1693763724793`
      : `https://es.memedroid.com/memes/getItemsByTag?tag=${query}&page=${page}&_=1693763724793`,
    {
      method: 'GET',
      responseType: ResponseType.JSON
    }
  )
    .then((response) => {
      if (!response.ok) return null
      return response.data
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}

async function findMemes(query: string) {
  const promises = await Promise.allSettled(
    Array.from({ length: 3 }).map((_, index) => fetchMemes(query, index + 1))
  )
  const filteredPromises: Response[] = promises
    .map((promise) =>
      promise.status === 'fulfilled' && promise.value ? promise.value : null
    )
    .filter(Boolean) as Response[]

  const data = filteredPromises
    .flatMap(
      ({ items }) =>
        items.map((i) => ({
          title: i.title,
          url: i.previewURLWebp ?? i.urlWebp ?? i.url
        })) as MappedMemes[]
    )
    .filter((item) => !item.url.includes('/videos'))
  return data
}
const pages: ExtensionPages = [
  {
    name: 'Memes',
    description: 'search for memes xD',
    icon: (
      <img
        src="https://github.com/JulianKominovic/memes-finder/assets/logo.png?raw=true"
        alt="memes extension logo"
      />
    ),
    route: '/memes',
    component() {
      const [images, setImages] = useState<MappedMemes[]>([])
      const { searchbarText, setIsGlobalSearchEnable } = useServices(
        (state) => ({
          searchbarText: state.searchbarText,
          setIsGlobalSearchEnable: state.setIsGlobalSearchEnable
        })
      )
      const { debounce } = useDebounceFunction(600)
      useEffect(() => {
        setIsGlobalSearchEnable(false)
        setImages([])

        debounce(() => {
          findMemes(searchbarText).then((data) => {
            if (!data) return
            setImages(data)
          })
        })
      }, [searchbarText])
      if (!images.length)
        return (
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              width: '100%',
              overflow: 'hidden',
              gap: '16px',
              padding: '16px',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(6, 1fr)'
            }}
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton.Custom
                key={index + 'loads'}
                style={{
                  height: '260px'
                }}
              />
            ))}
          </div>
        )
      return (
        <Command.Grid
          columns={3}
          id="sittly-memes"
          items={images.map(({ title, url }) => ({
            mainActionLabel: 'Paste meme to app',
            async onClick() {
              await clipboard.copyImageToClipboard(url)
              await clipboard.pasteClipboardToCurrentWindow()
            },
            onHighlight() {},
            customChildren: (
              <img
                style={{
                  height: '100%',
                  width: 'auto',
                  marginInline: 'auto',
                  objectFit: 'contain'
                }}
                src={url}
              />
            )
          }))}
        />
      )
    }
  }
]

/**
 * Metadata is really important, it's used to display your extension in the app.
 * @see docs.com
 */
const metadata: ExtensionMetadata = {
  name: 'Memes',
  description: 'Search for memes xD',
  icon: (
    <img
      src="https://github.com/JulianKominovic/memes-finder/assets/logo.png?raw=true"
      alt="memes extension logo"
    />
  ),
  repoUrl: 'https://github.com/JulianKominovic/memes-finder'
}

register({
  pages,
  metadata
})
