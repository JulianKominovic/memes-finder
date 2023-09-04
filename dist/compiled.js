"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.tsx
var sittly_memes = window.React;
var { register, api, components, utils, hooks } = window.SittlyDevtools;
var { network, clipboard } = api;
var { useDebounceFunction } = utils;
var { useServices } = hooks;
var { Command, Skeleton } = components;
var { powerfulFetch, ResponseType } = network;
function fetchMemes(query, page) {
  return powerfulFetch(
    query === "" ? `https://es.memedroid.com/memes/getTopItems/ever?page=${page}&_=1693763724793` : `https://es.memedroid.com/memes/getItemsByTag?tag=${query}&page=${page}&_=1693763724793`,
    {
      method: "GET",
      responseType: ResponseType.JSON
    }
  ).then((response) => {
    if (!response.ok)
      return null;
    return response.data;
  }).catch((error) => {
    console.log(error);
    return null;
  });
}
__name(fetchMemes, "fetchMemes");
async function findMemes(query) {
  const promises = await Promise.allSettled(
    Array.from({ length: 3 }).map((_, index) => fetchMemes(query, index + 1))
  );
  const filteredPromises = promises.map(
    (promise) => promise.status === "fulfilled" && promise.value ? promise.value : null
  ).filter(Boolean);
  const data = filteredPromises.flatMap(
    ({ items }) => items.map((i) => ({
      title: i.title,
      url: i.previewURLWebp ?? i.urlWebp ?? i.url
    }))
  ).filter((item) => !item.url.includes("/videos"));
  return data;
}
__name(findMemes, "findMemes");
var pages = [
  {
    name: "Memes",
    description: "search for memes xD",
    icon: /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "https://github.com/JulianKominovic/memes-finder/assets/logo.png?raw=true",
        alt: "memes extension logo"
      }
    ),
    route: "/memes",
    component() {
      const [images, setImages] = (0, sittly_memes.useState)([]);
      const { searchbarText, setIsGlobalSearchEnable } = useServices(
        (state) => ({
          searchbarText: state.searchbarText,
          setIsGlobalSearchEnable: state.setIsGlobalSearchEnable
        })
      );
      const { debounce } = useDebounceFunction(600);
      (0, sittly_memes.useEffect)(() => {
        setIsGlobalSearchEnable(false);
        setImages([]);
        debounce(() => {
          findMemes(searchbarText).then((data) => {
            if (!data)
              return;
            setImages(data);
          });
        });
      }, [searchbarText]);
      if (!images.length)
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            style: {
              display: "grid",
              placeItems: "center",
              width: "100%",
              overflow: "hidden",
              gap: "16px",
              padding: "16px",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(6, 1fr)"
            }
          },
          Array.from({ length: 9 }).map((_, index) => /* @__PURE__ */ React.createElement(
            Skeleton.Custom,
            {
              key: index + "loads",
              style: {
                height: "260px"
              }
            }
          ))
        );
      return /* @__PURE__ */ React.createElement(
        Command.Grid,
        {
          columns: 3,
          id: "sittly-memes",
          items: images.map(({ title, url }) => ({
            mainActionLabel: "Paste meme to app",
            async onClick() {
              await clipboard.copyImageToClipboard(url);
              await clipboard.pasteClipboardToCurrentWindow();
            },
            onHighlight() {
            },
            customChildren: /* @__PURE__ */ React.createElement(
              "img",
              {
                style: {
                  height: "100%",
                  width: "auto",
                  marginInline: "auto",
                  objectFit: "contain"
                },
                src: url
              }
            )
          }))
        }
      );
    }
  }
];
var metadata = {
  name: "Memes",
  description: "Search for memes xD",
  icon: /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://github.com/JulianKominovic/memes-finder/assets/logo.png?raw=true",
      alt: "memes extension logo"
    }
  ),
  repoUrl: "https://github.com/JulianKominovic/memes-finder"
};
register({
  pages,
  metadata
});
