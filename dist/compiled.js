"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.tsx
var sittly_memes3 = window.React;

// node_modules/.pnpm/react-icons@4.10.1_react@18.2.0/node_modules/react-icons/lib/esm/iconBase.js
var sittly_memes2 = {default:window.React};

// node_modules/.pnpm/react-icons@4.10.1_react@18.2.0/node_modules/react-icons/lib/esm/iconContext.js
var sittly_memes = {default:window.React};
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = sittly_memes.default.createContext && sittly_memes.default.createContext(DefaultContext);

// node_modules/.pnpm/react-icons@4.10.1_react@18.2.0/node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return sittly_memes2.default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
__name(Tree2Element, "Tree2Element");
function GenIcon(data) {
  return function(props) {
    return sittly_memes2.default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
__name(GenIcon, "GenIcon");
function IconBase(props) {
  var elem = /* @__PURE__ */ __name(function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return sittly_memes2.default.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && sittly_memes2.default.createElement("title", null, title), props.children);
  }, "elem");
  return IconContext !== void 0 ? sittly_memes2.default.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
__name(IconBase, "IconBase");

// node_modules/.pnpm/react-icons@4.10.1_react@18.2.0/node_modules/react-icons/bs/index.esm.js
function BsClipboard(props) {
  return GenIcon({ "tag": "svg", "attr": { "fill": "currentColor", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" } }, { "tag": "path", "attr": { "d": "M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" } }] })(props);
}
__name(BsClipboard, "BsClipboard");

// src/index.tsx
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
      const [images, setImages] = (0, sittly_memes3.useState)([]);
      const { searchbarText, setIsGlobalSearchEnable, setContextMenuOptions } = useServices((state) => ({
        searchbarText: state.searchbarText,
        setIsGlobalSearchEnable: state.setIsGlobalSearchEnable,
        setContextMenuOptions: state.setContextMenuOptions
      }));
      const { debounce } = useDebounceFunction(600);
      (0, sittly_memes3.useEffect)(() => {
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
          items: images.map(({ url }) => ({
            mainActionLabel: "Paste meme to app",
            async onClick() {
              await clipboard.copyImageToClipboard(url);
              await clipboard.pasteClipboardToCurrentWindow();
            },
            onHighlight() {
              setContextMenuOptions([
                {
                  title: "Copy image",
                  onClick: async () => {
                    await clipboard.copyImageToClipboard(url);
                  },
                  icon: /* @__PURE__ */ React.createElement(BsClipboard, null),
                  mainActionLabel: "Copy to clipboard"
                }
              ]);
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
