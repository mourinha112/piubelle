import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, getResponseStatus, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, getRouterParam, getHeader, getResponseStatusText } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/@vue/shared/dist/shared.cjs.js';
import { createClient } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/@supabase/supabase-js/dist/index.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/defu/dist/defu.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/devalue/index.js';
import { isVNode, isRef, toValue } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/vue/index.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/unhead/dist/plugins.mjs';
import { createHooks } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/errx/dist/index.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/unhead/dist/utils.mjs';
import { basename } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/@nuxt/icon/node_modules/pathe/dist/index.mjs';
import { getIcons } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/@iconify/utils/lib/index.mjs';
import { hash as hash$1 } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/@nuxt/icon/node_modules/ohash/dist/index.mjs';
import { collections } from 'file://C:/Users/Mourinha/Desktop/piubelle/.nuxt/nuxt-icon-server-bundle.mjs';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/ipx/dist/index.mjs';
import { isAbsolute } from 'file://C:/Users/Mourinha/Desktop/piubelle/node_modules/@nuxt/image/node_modules/pathe/dist/index.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/Mourinha/Desktop/piubelle/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/Mourinha/Desktop/piubelle","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/Mourinha/Desktop/piubelle/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/Mourinha/Desktop/piubelle/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/Mourinha/Desktop/piubelle/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/Mourinha/Desktop/piubelle/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  ui: {
    primary: "lilac",
    gray: "neutral",
    // Custom button styles
    button: {
      rounded: "rounded-2xl",
      default: {
        size: "lg"
      }
    },
    // Custom input styles
    input: {
      rounded: "rounded-xl",
      default: {
        size: "lg"
      }
    },
    // Custom card styles
    card: {
      rounded: "rounded-3xl",
      shadow: "shadow-soft",
      background: "bg-white/80 backdrop-blur-xl",
      ring: "ring-1 ring-lilac-100/50"
    },
    // Custom modal styles
    modal: {
      rounded: "rounded-3xl",
      shadow: "shadow-soft-lg",
      background: "bg-white",
      overlay: {
        background: "bg-rose-950/20 backdrop-blur-sm"
      }
    },
    // Notifications
    notifications: {
      position: "top-0 bottom-auto"
    }
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "lilac",
      "cream",
      "primary"
    ],
    "strategy": "merge"
  }
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "supabaseUrl": "https://idlicerzpysddtkfdwgd.supabase.co",
    "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbGljZXJ6cHlzZGR0a2Zkd2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNTQ2OTMsImV4cCI6MjA4NDczMDY5M30.Blp-dunqcdwvyUPW-1l-OUeFDryDhlBiWowq676rkPo"
  },
  "supabaseServiceKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbGljZXJ6cHlzZGR0a2Zkd2dkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTE1NDY5MywiZXhwIjoyMDg0NzMwNjkzfQ.myxCJeGy2xzOAnRwMIokMONT4v9oMXLT252SpjIZvMU",
  "jwtSecret": "piubelle-secret-key-2026",
  "icon": {
    "serverKnownCssClasses": []
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": [
        "C:/Users/Mourinha/Desktop/piubelle/public"
      ]
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	// If the client specifically requests HTML, then avoid classifying as JSON.
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		// let Nitro handle JSON errors
		return;
	}
	// invoke default Nitro error handler (which will log appropriately if required)
	const defaultRes = await defaultHandler(error, event, { json: true });
	// let Nitro handle redirect if appropriate
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		// normalize to string format expected by nuxt `error.vue`
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message
	errorObject.message ||= "Server Error";
	// we will be rendering this error internally so we can pass along the error.data safely
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	// Access request headers
	const reqHeaders = getRequestHeaders(event);
	// Detect to avoid recursion in SSR rendering of errors
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	// HTML response (via SSR)
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	// Fallback to static rendered error page
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			// TODO: Support `message` in template
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script$1 = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _RbczHwTx7cMYiLGekqwkwqsZKl4ethjyjBet2jYn58 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script$1}<\/script>`);
  });
});

const rootDir = "C:/Users/Mourinha/Desktop/piubelle";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"description","content":"Sistema completo para gestão de salões de beleza, manicure e estética"},{"name":"viewport","content":"width=device-width, initial-scale=1, viewport-fit=cover"},{"name":"theme-color","content":"#fdf2f8"}],"link":[{"rel":"icon","type":"image/svg+xml","href":"/favicon.svg"},{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"}],"style":[],"script":[],"noscript":[],"title":"PiuBelle - Gestão de Instituto de Beleza"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const __hLyi7BN7guSjl058ZbMBNrVZRcQ2J5gVAUemH7DSc = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			filename,
			stack: trace
		};
		// retain log to be include in the next render
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	// Pass any logs to the client
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"light\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _Ymi9scRbb6YuiBWwgKmXf8Bp6zqQdFkl98XJ60ljWmY = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _RbczHwTx7cMYiLGekqwkwqsZKl4ethjyjBet2jYn58,
__hLyi7BN7guSjl058ZbMBNrVZRcQ2J5gVAUemH7DSc,
_Ymi9scRbb6YuiBWwgKmXf8Bp6zqQdFkl98XJ60ljWmY
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32715-kY7ksJdRLdRx3ve0OOpyS+QWDIQ\"",
    "mtime": "2026-01-23T15:22:21.287Z",
    "size": 206613,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"bd0aa-tAUHnDdQu1XX5pIDhjSvWLo3jCI\"",
    "mtime": "2026-01-23T15:22:21.293Z",
    "size": 774314,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _OOSylE = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
	const ssrContext = {
		url: decodePath(event.path),
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	// TODO: support passing event to `useRuntimeConfig`
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => import('file://C:/Users/Mourinha/Desktop/piubelle/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => import('file://C:/Users/Mourinha/Desktop/piubelle/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
// -- SSR Renderer --
const getSSRRenderer = lazyCachedFunction(async () => {
	// Load server bundle
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	// Load precomputed dependencies
	const precomputed = undefined ;
	// Create renderer
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		// In development with vite-node, the manifest is on-demand and will be available after rendering
		// eslint-disable-next-line no-restricted-globals
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});
// -- SPA Renderer --
const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
		}
	});
	// Create SPA renderer and cache the result for all requests
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
/**
* remove the root node from the html body
*/
function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		// remove teleport anchor to avoid hydration issues
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	// Render app
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	// Handle errors
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			// Do not add links to resources that are inlined (vite v5+)
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			// Add CSS links in <head> for CSS files
			// - in dev mode when rendering an island and the file has scoped styles and is not a page
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	// TODO: remove for v4
	islandHead.link ||= [];
	islandHead.style ||= [];
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
async function getIslandContext(event) {
	// TODO: Strict validation for url
	let url = event.path || "";
	const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	// TODO: Validate context
	const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	const ctx = {
		url: "/",
		...context,
		id: hashId,
		name: componentName,
		props: destr$1(context.props) || {},
		slots: {},
		components: {}
	};
	return ctx;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
createClient(supabaseUrl, supabaseAnonKey);
const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseServiceKey);
};

const warnOnceSet = /* @__PURE__ */ new Set();
const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _3IcOZC = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola$1.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  } else {
    if (collectionName && !warnOnceSet.has(collectionName) && apiEndPoint === DEFAULT_ENDPOINT) {
      consola$1.warn([
        `[Icon] Collection \`${collectionName}\` is not found locally`,
        `We suggest to install it via \`npm i -D @iconify-json/${collectionName}\` to provide the best end-user experience.`
      ].join("\n"));
      warnOnceSet.add(collectionName);
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola$1.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola$1.error(e);
      if (e.status === 404)
        return createError({ status: 404 });
      else
        return createError({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery$1(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _Paj7dC = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_mocqd1 = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_mUj1jz = () => Promise.resolve().then(function () { return me_get$1; });
const _lazy_Z7JaGq = () => Promise.resolve().then(function () { return register_post$1; });
const _lazy_vPDUbG = () => Promise.resolve().then(function () { return _id__put$b; });
const _lazy_nvMNFx = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_fFJ266 = () => Promise.resolve().then(function () { return index_post$h; });
const _lazy_iegL5o = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_NkWAcd = () => Promise.resolve().then(function () { return index_post$f; });
const _lazy_6kJxuJ = () => Promise.resolve().then(function () { return stats_get$1; });
const _lazy_oII6s5 = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_hCRNHs = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_ctGxXH = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_1KjLxG = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_KxCx27 = () => Promise.resolve().then(function () { return _id__put$9; });
const _lazy_kBZZg5 = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_AMlpeE = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_9RorQC = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_Zb94VC = () => Promise.resolve().then(function () { return _id__put$7; });
const _lazy_xp3QLJ = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_n5pG3A = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_fmhUD6 = () => Promise.resolve().then(function () { return _id__put$5; });
const _lazy_Czy4KY = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_XSilTR = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_RxEtzz = () => Promise.resolve().then(function () { return _id__put$3; });
const _lazy_1WUNBs = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_237tce = () => Promise.resolve().then(function () { return my_get$1; });
const _lazy_E1i1x3 = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_j80Sxu = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_GlZb5L = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_PQPrRQ = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_SytmY2 = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_oF18MI = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_OUVqv4 = () => Promise.resolve().then(function () { return _slug__get$1; });
const _lazy_zS5ebV = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_rIa3RA = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _OOSylE, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/login', handler: _lazy_mocqd1, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/me', handler: _lazy_mUj1jz, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/register', handler: _lazy_Z7JaGq, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/appointments/:id', handler: _lazy_vPDUbG, lazy: true, middleware: false, method: "put" },
  { route: '/api/painel/appointments', handler: _lazy_nvMNFx, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/appointments', handler: _lazy_fFJ266, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/clients', handler: _lazy_iegL5o, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/clients', handler: _lazy_NkWAcd, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/dashboard/stats', handler: _lazy_6kJxuJ, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/link-bio', handler: _lazy_oII6s5, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/link-bio', handler: _lazy_hCRNHs, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/loyalty', handler: _lazy_ctGxXH, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/loyalty', handler: _lazy_1KjLxG, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/professionals/:id', handler: _lazy_KxCx27, lazy: true, middleware: false, method: "put" },
  { route: '/api/painel/professionals', handler: _lazy_kBZZg5, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/professionals', handler: _lazy_AMlpeE, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/queue/:id', handler: _lazy_9RorQC, lazy: true, middleware: false, method: "delete" },
  { route: '/api/painel/queue/:id', handler: _lazy_Zb94VC, lazy: true, middleware: false, method: "put" },
  { route: '/api/painel/queue', handler: _lazy_xp3QLJ, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/queue', handler: _lazy_n5pG3A, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/reviews/:id', handler: _lazy_fmhUD6, lazy: true, middleware: false, method: "put" },
  { route: '/api/painel/reviews', handler: _lazy_Czy4KY, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/salon/:id', handler: _lazy_XSilTR, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/salon/:id', handler: _lazy_RxEtzz, lazy: true, middleware: false, method: "put" },
  { route: '/api/painel/salon', handler: _lazy_1WUNBs, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/salon/my', handler: _lazy_237tce, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/services/:id', handler: _lazy_E1i1x3, lazy: true, middleware: false, method: "delete" },
  { route: '/api/painel/services/:id', handler: _lazy_j80Sxu, lazy: true, middleware: false, method: "put" },
  { route: '/api/painel/services', handler: _lazy_GlZb5L, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/services', handler: _lazy_PQPrRQ, lazy: true, middleware: false, method: "post" },
  { route: '/api/painel/transactions', handler: _lazy_SytmY2, lazy: true, middleware: false, method: "get" },
  { route: '/api/painel/transactions', handler: _lazy_oF18MI, lazy: true, middleware: false, method: "post" },
  { route: '/api/salao/:slug', handler: _lazy_OUVqv4, lazy: true, middleware: false, method: "get" },
  { route: '/api/salons', handler: _lazy_zS5ebV, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_rIa3RA, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _3IcOZC, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _Paj7dC, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_rIa3RA, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"version": "",
	"status": 500,
	"statusText": "Server error",
	"description": "This page is temporarily unavailable."
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);filter:blur(20vh)}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.-bottom-1\\/2{bottom:-50%}.left-0{left:0}.right-0{right:0}.grid{display:grid}.mb-16{margin-bottom:4rem}.mb-8{margin-bottom:2rem}.h-1\\/2{height:50%}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-8{padding-left:2rem;padding-right:2rem}.text-center{text-align:center}.text-8xl{font-size:6rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}}</style><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script></head><body class=\"antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black\"><div class=\"-bottom-1/2 fixed h-1/2 left-0 right-0 spotlight\"></div><div class=\"max-w-520px text-center\"><h1 class=\"font-medium mb-8 sm:text-10xl text-8xl\">" + escapeHtml(messages.status) + "</h1><p class=\"font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const login_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  try {
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "E-mail e senha s\xE3o obrigat\xF3rios"
      });
    }
    if (isSupabaseConfigured()) {
      const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password
      });
      if (authError) {
        throw createError({
          statusCode: 401,
          message: "E-mail ou senha incorretos"
        });
      }
      const { data: userData, error: userError } = await supabaseAdmin.from("users").select("*").eq("id", authData.user.id).single();
      if (userError || !userData) {
        const { data: newUser, error: createError2 } = await supabaseAdmin.from("users").insert({
          id: authData.user.id,
          email: authData.user.email,
          full_name: ((_a = authData.user.user_metadata) == null ? void 0 : _a.full_name) || email.split("@")[0],
          role: ((_b = authData.user.user_metadata) == null ? void 0 : _b.role) || "client"
        }).select().single();
        if (createError2) {
          console.error("Erro ao criar usu\xE1rio:", createError2);
        }
        return {
          success: true,
          data: {
            user: {
              id: authData.user.id,
              email: authData.user.email,
              fullName: (newUser == null ? void 0 : newUser.full_name) || email.split("@")[0],
              phone: (newUser == null ? void 0 : newUser.phone) || null,
              role: (newUser == null ? void 0 : newUser.role) || "client",
              avatarUrl: (newUser == null ? void 0 : newUser.avatar_url) || null
            },
            token: (_c = authData.session) == null ? void 0 : _c.access_token
          }
        };
      }
      return {
        success: true,
        data: {
          user: {
            id: userData.id,
            email: userData.email,
            fullName: userData.full_name,
            phone: userData.phone,
            role: userData.role,
            avatarUrl: userData.avatar_url
          },
          token: (_d = authData.session) == null ? void 0 : _d.access_token
        }
      };
    }
    const demoUsers = {
      "demo@piubelle.com": {
        id: "demo-user-id",
        email: "demo@piubelle.com",
        password: "123456",
        fullName: "Gestora Demo",
        phone: "(79) 99999-9999",
        role: "manager"
      },
      "admin@mockup.piubelle.com": {
        id: "mockup-user-id",
        email: "admin@mockup.piubelle.com",
        password: "Mockup@2024",
        fullName: "Administradora Mockup",
        phone: "(79) 99999-0000",
        role: "manager"
      }
    };
    const user = demoUsers[email.toLowerCase()];
    if (!user || user.password !== password) {
      throw createError({
        statusCode: 401,
        message: "E-mail ou senha incorretos"
      });
    }
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1e3
    })).toString("base64");
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role,
          avatarUrl: null
        },
        token
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const me_get = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o necess\xE1rio"
      });
    }
    const token = authHeader.replace("Bearer ", "");
    if (isSupabaseConfigured()) {
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
      if (authError || !user) {
        throw createError({
          statusCode: 401,
          message: "Token inv\xE1lido"
        });
      }
      const { data: userData } = await supabaseAdmin.from("users").select("*").eq("id", user.id).single();
      const { data: salons } = await supabaseAdmin.from("salons").select("id, name, slug, logo_url").eq("owner_id", user.id).eq("is_active", true);
      return {
        success: true,
        user: userData ? {
          id: userData.id,
          email: userData.email,
          fullName: userData.full_name,
          phone: userData.phone,
          role: userData.role,
          avatarUrl: userData.avatar_url
        } : {
          id: user.id,
          email: user.email,
          fullName: ((_a = user.user_metadata) == null ? void 0 : _a.full_name) || ((_b = user.email) == null ? void 0 : _b.split("@")[0]),
          phone: null,
          role: ((_c = user.user_metadata) == null ? void 0 : _c.role) || "client",
          avatarUrl: null
        },
        salons: (salons == null ? void 0 : salons.map((s) => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          logoUrl: s.logo_url
        }))) || []
      };
    }
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString());
      if (decoded.exp < Date.now()) {
        throw createError({
          statusCode: 401,
          message: "Token expirado"
        });
      }
      return {
        success: true,
        user: {
          id: decoded.userId,
          email: "local@demo.com",
          fullName: "Usu\xE1rio Local",
          phone: null,
          role: "manager",
          avatarUrl: null
        },
        salons: []
      };
    } catch {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const me_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: me_get
}, Symbol.toStringTag, { value: 'Module' }));

const localUsers = /* @__PURE__ */ new Map();
const register_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const body = await readBody(event);
    const { email, password, fullName, phone, role = "client" } = body;
    if (!email || !password || !fullName) {
      throw createError({
        statusCode: 400,
        message: "E-mail, senha e nome s\xE3o obrigat\xF3rios"
      });
    }
    if (password.length < 6) {
      throw createError({
        statusCode: 400,
        message: "Senha deve ter pelo menos 6 caracteres"
      });
    }
    if (isSupabaseConfigured()) {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        // Auto confirmar e-mail
        user_metadata: {
          full_name: fullName,
          role
        }
      });
      if (authError) {
        if (authError.message.includes("already registered")) {
          throw createError({
            statusCode: 400,
            message: "Este e-mail j\xE1 est\xE1 cadastrado"
          });
        }
        throw createError({
          statusCode: 400,
          message: authError.message
        });
      }
      const { data: userData, error: userError } = await supabaseAdmin.from("users").select("*").eq("id", authData.user.id).single();
      if (userError) {
        await supabaseAdmin.from("users").insert({
          id: authData.user.id,
          email,
          full_name: fullName,
          phone,
          role
        });
      }
      const { data: loginData } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password
      });
      return {
        success: true,
        data: {
          user: {
            id: authData.user.id,
            email,
            fullName,
            phone,
            role,
            avatarUrl: null
          },
          token: ((_a = loginData == null ? void 0 : loginData.session) == null ? void 0 : _a.access_token) || ""
        }
      };
    }
    if (localUsers.has(email.toLowerCase())) {
      throw createError({
        statusCode: 400,
        message: "Este e-mail j\xE1 est\xE1 cadastrado"
      });
    }
    const userId = `local-${Date.now()}`;
    const user = {
      id: userId,
      email: email.toLowerCase(),
      password,
      fullName,
      phone,
      role,
      avatarUrl: null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localUsers.set(email.toLowerCase(), user);
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1e3
    })).toString("base64");
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role,
          avatarUrl: null
        },
        token
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const register_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: register_post,
  localUsers: localUsers
}, Symbol.toStringTag, { value: 'Module' }));

const appointments$1 = /* @__PURE__ */ new Map();
const _id__put$a = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID do agendamento \xE9 obrigat\xF3rio"
      });
    }
    const appointment = appointments$1.get(id);
    if (!appointment) {
      throw createError({
        statusCode: 404,
        message: "Agendamento n\xE3o encontrado"
      });
    }
    const updatedAppointment = {
      ...appointment,
      ...body,
      id: appointment.id,
      salonId: appointment.salonId,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (body.status === "confirmed" && appointment.status !== "confirmed") {
      updatedAppointment.confirmedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    if (body.status === "completed" && appointment.status !== "completed") {
      updatedAppointment.completedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    if (body.status === "cancelled" && appointment.status !== "cancelled") {
      updatedAppointment.cancelledAt = (/* @__PURE__ */ new Date()).toISOString();
      updatedAppointment.cancellationReason = body.cancellationReason || null;
    }
    appointments$1.set(id, updatedAppointment);
    return {
      success: true,
      message: "Agendamento atualizado com sucesso!",
      data: updatedAppointment
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _id__put$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$a
}, Symbol.toStringTag, { value: 'Module' }));

const localAppointments = /* @__PURE__ */ new Map();
const index_get$i = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    const date = query.date;
    const status = query.status;
    const professionalId = query.professionalId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin.from("appointments").select(`
          id,
          date,
          start_time,
          end_time,
          status,
          final_price,
          notes,
          client:clients(id, full_name, phone),
          professional:professionals(id, name),
          service:services(id, name)
        `).eq("salon_id", salonId).order("start_time", { ascending: true });
      if (date) {
        queryBuilder = queryBuilder.eq("date", date);
      }
      if (status) {
        queryBuilder = queryBuilder.eq("status", status);
      }
      if (professionalId) {
        queryBuilder = queryBuilder.eq("professional_id", professionalId);
      }
      const { data, error } = await queryBuilder;
      if (error) throw createError({ statusCode: 500, message: error.message });
      const appointments = (data || []).map((a) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        return {
          id: a.id,
          date: a.date,
          startTime: a.start_time,
          endTime: a.end_time,
          status: a.status,
          total: parseFloat(a.final_price) || 0,
          notes: a.notes,
          clientId: (_a = a.client) == null ? void 0 : _a.id,
          clientName: ((_b = a.client) == null ? void 0 : _b.full_name) || "Cliente",
          clientPhone: (_c = a.client) == null ? void 0 : _c.phone,
          professionalId: (_d = a.professional) == null ? void 0 : _d.id,
          professionalName: ((_e = a.professional) == null ? void 0 : _e.name) || "Profissional",
          serviceId: (_f = a.service) == null ? void 0 : _f.id,
          serviceName: ((_g = a.service) == null ? void 0 : _g.name) || "Servi\xE7o",
          client: ((_h = a.client) == null ? void 0 : _h.full_name) || "Cliente",
          service: ((_i = a.service) == null ? void 0 : _i.name) || "Servi\xE7o",
          time: a.start_time,
          professional: ((_j = a.professional) == null ? void 0 : _j.name) || "Profissional"
        };
      });
      return {
        success: true,
        data: appointments,
        total: appointments.length
      };
    }
    let result = Array.from(localAppointments.values());
    result = result.filter((a) => a.salonId === salonId);
    if (date) {
      result = result.filter((a) => a.date === date);
    }
    if (status) {
      result = result.filter((a) => a.status === status);
    }
    if (professionalId) {
      result = result.filter((a) => a.professionalId === professionalId);
    }
    result.sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));
    return {
      success: true,
      data: result,
      total: result.length
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$j = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$i,
  localAppointments: localAppointments
}, Symbol.toStringTag, { value: 'Module' }));

const appointments = /* @__PURE__ */ new Map();
function generateId$1() {
  return "apt-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
const index_post$g = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      salonId,
      clientId,
      professionalId,
      date,
      startTime,
      endTime,
      services,
      total,
      notes,
      source
    } = body;
    if (!salonId || !clientId || !date || !startTime) {
      throw createError({
        statusCode: 400,
        message: "Campos obrigat\xF3rios: salonId, clientId, date, startTime"
      });
    }
    const appointmentId = generateId$1();
    const newAppointment = {
      id: appointmentId,
      salonId,
      clientId,
      professionalId: professionalId || null,
      date,
      startTime,
      endTime: endTime || startTime,
      status: "pending",
      subtotal: total || 0,
      discountAmount: 0,
      total: total || 0,
      depositAmount: 0,
      depositPaid: false,
      notes: notes || null,
      clientNotes: null,
      source: source || "app",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    appointments.set(appointmentId, newAppointment);
    return {
      success: true,
      message: "Agendamento criado com sucesso!",
      data: newAppointment
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_post$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$g
}, Symbol.toStringTag, { value: 'Module' }));

const localClients = /* @__PURE__ */ new Map();
const index_get$g = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    const search = query.search;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin.from("clients").select("*").eq("salon_id", salonId).order("created_at", { ascending: false });
      if (search) {
        queryBuilder = queryBuilder.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
      }
      const { data, error } = await queryBuilder;
      if (error) throw createError({ statusCode: 500, message: error.message });
      const clients = (data || []).map((c) => ({
        id: c.id,
        name: c.full_name,
        phone: c.phone,
        email: c.email,
        birthDate: c.birth_date,
        gender: c.gender,
        notes: c.notes,
        isVip: c.is_vip,
        visitCount: c.visit_count || 0,
        totalSpent: parseFloat(c.total_spent) || 0,
        lastVisit: c.last_visit,
        createdAt: c.created_at
      }));
      return {
        success: true,
        data: clients,
        total: clients.length
      };
    }
    let result = Array.from(localClients.values());
    result = result.filter((c) => c.salonId === salonId);
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (c) => {
          var _a, _b, _c;
          return ((_a = c.name) == null ? void 0 : _a.toLowerCase().includes(searchLower)) || ((_b = c.phone) == null ? void 0 : _b.includes(search)) || ((_c = c.email) == null ? void 0 : _c.toLowerCase().includes(searchLower));
        }
      );
    }
    return {
      success: true,
      data: result,
      total: result.length
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$g,
  localClients: localClients
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$e = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const body = await readBody(event);
    const { salonId, name, phone, email, birthDate, gender, notes, isVip } = body;
    if (!salonId || !name) {
      throw createError({ statusCode: 400, message: "salonId e name s\xE3o obrigat\xF3rios" });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("clients").insert({
        salon_id: salonId,
        full_name: name,
        phone: phone || null,
        email: email || null,
        birth_date: birthDate || null,
        gender: gender || null,
        notes: notes || null,
        is_vip: isVip || false,
        visit_count: 0,
        total_spent: 0
      }).select().single();
      if (error) throw createError({ statusCode: 500, message: error.message });
      return {
        success: true,
        data: {
          id: data.id,
          name: data.full_name,
          phone: data.phone,
          email: data.email,
          birthDate: data.birth_date,
          gender: data.gender,
          notes: data.notes,
          isVip: data.is_vip,
          visitCount: 0,
          totalSpent: 0,
          createdAt: data.created_at
        }
      };
    }
    const id = `client-${Date.now()}`;
    const newClient = {
      id,
      salonId,
      name,
      phone,
      email,
      birthDate,
      gender,
      notes,
      isVip: isVip || false,
      visitCount: 0,
      totalSpent: 0,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localClients.set(id, newClient);
    return { success: true, data: newClient };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_post$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$e
}, Symbol.toStringTag, { value: 'Module' }));

const stats_get = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    if (isSupabaseConfigured()) {
      const { data: todayAppointments, error: aptError } = await supabaseAdmin.from("appointments").select("id, status, final_price").eq("salon_id", salonId).eq("date", today);
      const { data: queueData, error: queueError } = await supabaseAdmin.from("queue").select("id").eq("salon_id", salonId).in("status", ["waiting", "called", "in_service"]);
      const { data: salonData, error: salonError } = await supabaseAdmin.from("salons").select("rating").eq("id", salonId).single();
      const todayRevenue = (todayAppointments || []).filter((a) => a.status === "completed").reduce((sum, a) => sum + (parseFloat(a.final_price) || 0), 0);
      return {
        success: true,
        data: {
          todayAppointments: (todayAppointments || []).length,
          todayRevenue,
          queueCount: (queueData || []).length,
          rating: (salonData == null ? void 0 : salonData.rating) || 0
        }
      };
    }
    return {
      success: true,
      data: {
        todayAppointments: 0,
        todayRevenue: 0,
        queueCount: 0,
        rating: 0
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const stats_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: stats_get
}, Symbol.toStringTag, { value: 'Module' }));

const localLinkBio = /* @__PURE__ */ new Map();
const index_get$e = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { data: salon, error: salonError } = await supabaseAdmin.from("salons").select("name, description, logo_url, instagram, facebook, tiktok, whatsapp").eq("id", salonId).single();
      if (salonError) {
        throw createError({ statusCode: 500, message: salonError.message });
      }
      const { data: links, error: linksError } = await supabaseAdmin.from("link_bio_links").select("id, title, url, icon, sort_order, clicks").eq("salon_id", salonId).eq("is_active", true).order("sort_order", { ascending: true });
      if (linksError) {
        console.error("Error fetching links:", linksError);
      }
      return {
        success: true,
        data: {
          title: (salon == null ? void 0 : salon.name) || "",
          bio: (salon == null ? void 0 : salon.description) || "",
          avatarUrl: (salon == null ? void 0 : salon.logo_url) || "",
          instagram: (salon == null ? void 0 : salon.instagram) || "",
          facebook: (salon == null ? void 0 : salon.facebook) || "",
          tiktok: (salon == null ? void 0 : salon.tiktok) || "",
          whatsapp: (salon == null ? void 0 : salon.whatsapp) || "",
          links: (links || []).map((l) => ({
            id: l.id,
            title: l.title,
            url: l.url,
            icon: l.icon,
            clicks: l.clicks
          })),
          viewCount: 0,
          clickCount: (links || []).reduce((sum, l) => sum + (l.clicks || 0), 0)
        }
      };
    }
    const linkBio = localLinkBio.get(salonId);
    return {
      success: true,
      data: linkBio || null
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno"
    });
  }
});

const index_get$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$e,
  localLinkBio: localLinkBio
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$c = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const body = await readBody(event);
    const { salonId, title, bio, avatarUrl, instagram, facebook, tiktok, whatsapp, links } = body;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { error: salonError } = await supabaseAdmin.from("salons").update({
        description: bio || null,
        instagram: instagram || null,
        facebook: facebook || null,
        tiktok: tiktok || null,
        whatsapp: whatsapp || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", salonId);
      if (salonError) {
        throw createError({ statusCode: 500, message: salonError.message });
      }
      if (links && Array.isArray(links)) {
        await supabaseAdmin.from("link_bio_links").delete().eq("salon_id", salonId);
        if (links.length > 0) {
          const linksToInsert = links.map((link, index) => ({
            salon_id: salonId,
            title: link.title || "",
            url: link.url || "",
            icon: link.icon || null,
            sort_order: index,
            is_active: true
          }));
          const { error: linksError } = await supabaseAdmin.from("link_bio_links").insert(linksToInsert);
          if (linksError) {
            console.error("Error saving links:", linksError);
          }
        }
      }
      return {
        success: true,
        data: {
          title,
          bio,
          avatarUrl,
          instagram,
          facebook,
          tiktok,
          whatsapp,
          links: links || []
        }
      };
    }
    const linkBioData = {
      salonId,
      title,
      bio,
      avatarUrl,
      instagram,
      facebook,
      tiktok,
      whatsapp,
      links: links || [],
      viewCount: 0,
      clickCount: 0
    };
    localLinkBio.set(salonId, linkBioData);
    return { success: true, data: linkBioData };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno"
    });
  }
});

const index_post$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$c
}, Symbol.toStringTag, { value: 'Module' }));

const localLoyalty = /* @__PURE__ */ new Map();
const index_get$c = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { data: program, error: programError } = await supabaseAdmin.from("loyalty_programs").select("*").eq("salon_id", salonId).single();
      const { data: topClients, error: clientsError } = await supabaseAdmin.from("clients").select("id, full_name, visit_count, loyalty_points").eq("salon_id", salonId).order("loyalty_points", { ascending: false }).limit(5);
      const { data: allClients } = await supabaseAdmin.from("clients").select("loyalty_points").eq("salon_id", salonId).gt("loyalty_points", 0);
      const participants = (allClients || []).length;
      const totalPoints = (allClients || []).reduce((sum, c) => sum + (c.loyalty_points || 0), 0);
      return {
        success: true,
        data: {
          program: program ? {
            isActive: program.is_active,
            name: program.name,
            description: program.description,
            pointsRequired: program.points_required,
            rewardName: program.reward_name,
            rewardValue: parseFloat(program.reward_value) || 0
          } : null,
          stats: {
            participants,
            totalPoints,
            rewardsRedeemed: 0,
            closeToReward: 0
          },
          topClients: (topClients || []).map((c) => ({
            id: c.id,
            name: c.full_name,
            visits: c.visit_count || 0,
            points: c.loyalty_points || 0,
            rewards: 0
          }))
        }
      };
    }
    const loyalty = localLoyalty.get(salonId);
    return {
      success: true,
      data: {
        program: (loyalty == null ? void 0 : loyalty.program) || null,
        stats: {
          participants: 0,
          totalPoints: 0,
          rewardsRedeemed: 0,
          closeToReward: 0
        },
        topClients: []
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$c,
  localLoyalty: localLoyalty
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$a = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const body = await readBody(event);
    const { salonId, name, description, pointsRequired, rewardName, rewardValue, isActive } = body;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { data: existing } = await supabaseAdmin.from("loyalty_programs").select("id").eq("salon_id", salonId).single();
      const programData = {
        salon_id: salonId,
        name: name || "Programa de Fidelidade",
        description: description || "",
        points_required: pointsRequired || 10,
        reward_name: rewardName || "Servi\xE7o Gr\xE1tis",
        reward_value: rewardValue || 0,
        is_active: isActive !== false,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      let result;
      if (existing) {
        const { data, error } = await supabaseAdmin.from("loyalty_programs").update(programData).eq("id", existing.id).select().single();
        if (error) throw createError({ statusCode: 500, message: error.message });
        result = data;
      } else {
        const { data, error } = await supabaseAdmin.from("loyalty_programs").insert(programData).select().single();
        if (error) throw createError({ statusCode: 500, message: error.message });
        result = data;
      }
      return {
        success: true,
        data: {
          isActive: result.is_active,
          name: result.name,
          description: result.description,
          pointsRequired: result.points_required,
          rewardName: result.reward_name,
          rewardValue: parseFloat(result.reward_value) || 0
        }
      };
    }
    const program = {
      isActive: isActive !== false,
      name: name || "Programa de Fidelidade",
      description: description || "",
      pointsRequired: pointsRequired || 10,
      rewardName: rewardName || "Servi\xE7o Gr\xE1tis",
      rewardValue: rewardValue || 0
    };
    localLoyalty.set(salonId, { program });
    return { success: true, data: program };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_post$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$a
}, Symbol.toStringTag, { value: 'Module' }));

const localProfessionals = /* @__PURE__ */ new Map();
const index_get$a = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("professionals").select("*").eq("salon_id", salonId).eq("is_active", true).order("name", { ascending: true });
      if (error) throw createError({ statusCode: 500, message: error.message });
      const professionals = (data || []).map((p) => ({
        id: p.id,
        name: p.name,
        email: p.email,
        phone: p.phone,
        photo: p.avatar_url,
        role: p.bio,
        // Using bio as role
        specialties: p.specialties,
        isActive: p.is_active,
        rating: p.rating,
        createdAt: p.created_at
      }));
      return {
        success: true,
        data: professionals,
        total: professionals.length
      };
    }
    let result = Array.from(localProfessionals.values());
    result = result.filter((p) => p.salonId === salonId);
    return {
      success: true,
      data: result,
      total: result.length
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$a,
  localProfessionals: localProfessionals
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$8 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const { name, email, phone, role, isActive } = body;
    if (!id) {
      throw createError({ statusCode: 400, message: "id \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const updateData = { updated_at: (/* @__PURE__ */ new Date()).toISOString() };
      if (name !== void 0) updateData.name = name;
      if (email !== void 0) updateData.email = email;
      if (phone !== void 0) updateData.phone = phone;
      if (role !== void 0) updateData.bio = role;
      if (isActive !== void 0) updateData.is_active = isActive;
      const { data, error } = await supabaseAdmin.from("professionals").update(updateData).eq("id", id).select().single();
      if (error) throw createError({ statusCode: 500, message: error.message });
      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.bio,
          // Return bio as role
          isActive: data.is_active,
          rating: data.rating
        }
      };
    }
    const professional = localProfessionals.get(id);
    if (!professional) {
      throw createError({ statusCode: 404, message: "Profissional n\xE3o encontrado" });
    }
    if (name !== void 0) professional.name = name;
    if (email !== void 0) professional.email = email;
    if (phone !== void 0) professional.phone = phone;
    if (role !== void 0) professional.role = role;
    if (isActive !== void 0) professional.isActive = isActive;
    localProfessionals.set(id, professional);
    return { success: true, data: professional };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _id__put$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$8 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const body = await readBody(event);
    const { salonId, name, email, phone, role, isActive } = body;
    if (!salonId || !name) {
      throw createError({ statusCode: 400, message: "salonId e name s\xE3o obrigat\xF3rios" });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("professionals").insert({
        salon_id: salonId,
        name,
        email: email || null,
        phone: phone || null,
        bio: role || null,
        // Using bio field to store role/function
        is_active: isActive !== false,
        rating: 0,
        review_count: 0
      }).select().single();
      if (error) {
        console.error("Supabase error creating professional:", error);
        throw createError({ statusCode: 500, message: error.message });
      }
      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.bio,
          // Return bio as role
          isActive: data.is_active,
          rating: data.rating,
          createdAt: data.created_at
        }
      };
    }
    const id = `pro-${Date.now()}`;
    const newProfessional = {
      id,
      salonId,
      name,
      email,
      phone,
      role,
      isActive: isActive !== false,
      rating: 0,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localProfessionals.set(id, newProfessional);
    return { success: true, data: newProfessional };
  } catch (error) {
    console.error("Error creating professional:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_post$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$8
}, Symbol.toStringTag, { value: 'Module' }));

const localQueue = /* @__PURE__ */ new Map();
const index_get$8 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("queue").select(`
          id,
          client_name,
          client_phone,
          status,
          position,
          created_at,
          called_at,
          started_at,
          service:services(name),
          professional:professionals(name)
        `).eq("salon_id", salonId).in("status", ["waiting", "called", "in_service"]).order("position", { ascending: true });
      if (error) throw createError({ statusCode: 500, message: error.message });
      const queueItems2 = (data || []).map((item) => {
        var _a, _b;
        const enteredAt = new Date(item.created_at);
        const now = /* @__PURE__ */ new Date();
        const waitMinutes = Math.round((now.getTime() - enteredAt.getTime()) / 6e4);
        return {
          id: item.id,
          clientName: item.client_name,
          phone: item.client_phone,
          serviceName: ((_a = item.service) == null ? void 0 : _a.name) || null,
          professionalName: ((_b = item.professional) == null ? void 0 : _b.name) || null,
          status: item.status,
          enteredAt: item.created_at,
          waitTime: `${waitMinutes} min`
        };
      });
      return { success: true, data: queueItems2 };
    }
    const queueItems = [];
    localQueue.forEach((item, id) => {
      if (item.salonId === salonId && ["waiting", "called", "in_service"].includes(item.status)) {
        const enteredAt = new Date(item.enteredAt);
        const now = /* @__PURE__ */ new Date();
        const waitMinutes = Math.round((now.getTime() - enteredAt.getTime()) / 6e4);
        queueItems.push({
          ...item,
          waitTime: `${waitMinutes} min`
        });
      }
    });
    queueItems.sort((a, b) => new Date(a.enteredAt).getTime() - new Date(b.enteredAt).getTime());
    return { success: true, data: queueItems };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno"
    });
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8,
  localQueue: localQueue
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$2 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({ statusCode: 400, message: "id \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { error } = await supabaseAdmin.from("queue").delete().eq("id", id);
      if (error) throw createError({ statusCode: 500, message: error.message });
      return { success: true };
    }
    if (!localQueue.has(id)) {
      throw createError({ statusCode: 404, message: "Item n\xE3o encontrado" });
    }
    localQueue.delete(id);
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno"
    });
  }
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$6 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const { status } = body;
    if (!id || !status) {
      throw createError({ statusCode: 400, message: "id e status s\xE3o obrigat\xF3rios" });
    }
    const updateData = { status };
    if (status === "called") {
      updateData.called_at = (/* @__PURE__ */ new Date()).toISOString();
    } else if (status === "in_service") {
      updateData.started_at = (/* @__PURE__ */ new Date()).toISOString();
    } else if (status === "completed") {
      updateData.completed_at = (/* @__PURE__ */ new Date()).toISOString();
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("queue").update(updateData).eq("id", id).select().single();
      if (error) throw createError({ statusCode: 500, message: error.message });
      return { success: true, data };
    }
    const item = localQueue.get(id);
    if (!item) {
      throw createError({ statusCode: 404, message: "Item n\xE3o encontrado" });
    }
    item.status = status;
    if (status === "called") item.calledAt = (/* @__PURE__ */ new Date()).toISOString();
    if (status === "in_service") item.startedAt = (/* @__PURE__ */ new Date()).toISOString();
    if (status === "completed") item.completedAt = (/* @__PURE__ */ new Date()).toISOString();
    localQueue.set(id, item);
    return { success: true, data: item };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno"
    });
  }
});

const _id__put$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$6 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const body = await readBody(event);
    const { salonId, clientName, phone, serviceName, professionalName } = body;
    if (!salonId || !clientName) {
      throw createError({ statusCode: 400, message: "salonId e clientName s\xE3o obrigat\xF3rios" });
    }
    if (isSupabaseConfigured()) {
      const { data: lastItem } = await supabaseAdmin.from("queue").select("position").eq("salon_id", salonId).order("position", { ascending: false }).limit(1).single();
      const nextPosition = ((lastItem == null ? void 0 : lastItem.position) || 0) + 1;
      const { data, error } = await supabaseAdmin.from("queue").insert({
        salon_id: salonId,
        client_name: clientName,
        client_phone: phone || null,
        position: nextPosition,
        status: "waiting"
      }).select().single();
      if (error) throw createError({ statusCode: 500, message: error.message });
      return {
        success: true,
        data: {
          id: data.id,
          clientName: data.client_name,
          phone: data.client_phone,
          serviceName: serviceName || null,
          professionalName: professionalName || null,
          status: data.status,
          enteredAt: data.created_at,
          waitTime: "0 min"
        }
      };
    }
    const id = `queue-${Date.now()}`;
    const newItem = {
      id,
      salonId,
      clientName,
      phone,
      serviceName,
      professionalName,
      status: "waiting",
      enteredAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localQueue.set(id, newItem);
    return {
      success: true,
      data: {
        ...newItem,
        waitTime: "0 min"
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno"
    });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$6
}, Symbol.toStringTag, { value: 'Module' }));

const localReviews = /* @__PURE__ */ new Map();
const index_get$6 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("reviews").select(`
          id,
          rating,
          comment,
          owner_response,
          responded_at,
          created_at,
          client:clients(id, full_name),
          professional:professionals(id, name),
          service:services(id, name)
        `).eq("salon_id", salonId).eq("is_public", true).order("created_at", { ascending: false });
      if (error) throw createError({ statusCode: 500, message: error.message });
      const reviews = (data || []).map((r) => {
        var _a, _b, _c, _d, _e, _f;
        return {
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          ownerResponse: r.owner_response,
          respondedAt: r.responded_at,
          createdAt: r.created_at,
          clientId: (_a = r.client) == null ? void 0 : _a.id,
          clientName: ((_b = r.client) == null ? void 0 : _b.full_name) || "Cliente",
          professionalId: (_c = r.professional) == null ? void 0 : _c.id,
          professionalName: (_d = r.professional) == null ? void 0 : _d.name,
          serviceId: (_e = r.service) == null ? void 0 : _e.id,
          serviceName: (_f = r.service) == null ? void 0 : _f.name
        };
      });
      return {
        success: true,
        data: reviews,
        total: reviews.length
      };
    }
    let result = Array.from(localReviews.values());
    result = result.filter((r) => r.salonId === salonId);
    return {
      success: true,
      data: result,
      total: result.length
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6,
  localReviews: localReviews
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$4 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const { ownerResponse } = body;
    if (!id) {
      throw createError({ statusCode: 400, message: "id \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("reviews").update({
        owner_response: ownerResponse,
        responded_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", id).select().single();
      if (error) throw createError({ statusCode: 500, message: error.message });
      return { success: true, data };
    }
    const review = localReviews.get(id);
    if (!review) {
      throw createError({ statusCode: 404, message: "Avalia\xE7\xE3o n\xE3o encontrada" });
    }
    review.ownerResponse = ownerResponse;
    review.respondedAt = (/* @__PURE__ */ new Date()).toISOString();
    localReviews.set(id, review);
    return { success: true, data: review };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _id__put$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$4
}, Symbol.toStringTag, { value: 'Module' }));

const salons$1 = /* @__PURE__ */ new Map();
salons$1.set("demo-salon-id", {
  id: "demo-salon-id",
  ownerId: "demo-user-id",
  name: "Studio Belle Hair",
  slug: "studio-belle-hair",
  description: "Sal\xE3o de beleza completo com profissionais especializados",
  logoUrl: null,
  coverUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
  phone: "(79) 99999-9999",
  whatsapp: "(79) 99999-9999",
  email: "contato@studiobelle.com",
  website: "https://studiobelle.com",
  instagram: "@studiobellehair",
  addressStreet: "Av. Beira Mar",
  addressNumber: "1500",
  addressNeighborhood: "Centro",
  addressCity: "Aracaju",
  addressState: "SE",
  addressZipcode: "49000-000",
  latitude: -10.9472,
  longitude: -37.0731,
  bookingAdvanceDays: 30,
  bookingCancelHours: 2,
  autoConfirmBooking: false,
  isActive: true,
  isVerified: true,
  isFeatured: true,
  rating: 4.9,
  reviewCount: 256,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: (/* @__PURE__ */ new Date()).toISOString()
});
const _id__get = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID do sal\xE3o \xE9 obrigat\xF3rio"
      });
    }
    const salon = salons$1.get(id);
    if (!salon) {
      throw createError({
        statusCode: 404,
        message: "Sal\xE3o n\xE3o encontrado"
      });
    }
    return {
      success: true,
      data: salon
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const salons = /* @__PURE__ */ new Map();
const _id__put$2 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID do sal\xE3o \xE9 obrigat\xF3rio"
      });
    }
    const salon = salons.get(id);
    if (!salon) {
      throw createError({
        statusCode: 404,
        message: "Sal\xE3o n\xE3o encontrado"
      });
    }
    const updatedSalon = {
      ...salon,
      ...body,
      id: salon.id,
      // Não permitir alterar ID
      ownerId: salon.ownerId,
      // Não permitir alterar dono
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    salons.set(id, updatedSalon);
    return {
      success: true,
      message: "Sal\xE3o atualizado com sucesso!",
      data: updatedSalon
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _id__put$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$2
}, Symbol.toStringTag, { value: 'Module' }));

const localSalons = /* @__PURE__ */ new Map();
function generateSlug(name) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const index_post$4 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, phone, description } = body;
    if (!name) {
      throw createError({
        statusCode: 400,
        message: "Nome do sal\xE3o \xE9 obrigat\xF3rio"
      });
    }
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o necess\xE1rio"
      });
    }
    const token = authHeader.replace("Bearer ", "");
    let userId = "";
    if (isSupabaseConfigured()) {
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
      if (authError || !user) {
        throw createError({
          statusCode: 401,
          message: "Token inv\xE1lido"
        });
      }
      userId = user.id;
      const slug2 = generateSlug(name) + "-" + Date.now().toString(36);
      const { data: salon2, error: salonError } = await supabaseAdmin.from("salons").insert({
        owner_id: userId,
        name,
        slug: slug2,
        phone,
        description,
        is_active: true
      }).select().single();
      if (salonError) {
        console.error("Erro ao criar sal\xE3o:", salonError);
        throw createError({
          statusCode: 500,
          message: "Erro ao criar sal\xE3o: " + salonError.message
        });
      }
      await supabaseAdmin.from("users").update({ role: "manager" }).eq("id", userId);
      return {
        success: true,
        data: {
          id: salon2.id,
          name: salon2.name,
          slug: salon2.slug,
          phone: salon2.phone,
          description: salon2.description
        }
      };
    }
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString());
      userId = decoded.userId;
    } catch {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const salonId = `local-salon-${Date.now()}`;
    const slug = generateSlug(name) + "-" + Date.now().toString(36);
    const salon = {
      id: salonId,
      ownerId: userId,
      name,
      slug,
      phone,
      description,
      isActive: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localSalons.set(salonId, salon);
    return {
      success: true,
      data: {
        id: salon.id,
        name: salon.name,
        slug: salon.slug,
        phone: salon.phone,
        description: salon.description
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$4,
  localSalons: localSalons
}, Symbol.toStringTag, { value: 'Module' }));

const my_get = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o necess\xE1rio"
      });
    }
    const token = authHeader.replace("Bearer ", "");
    let userId = "";
    if (isSupabaseConfigured()) {
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
      if (authError || !user) {
        throw createError({
          statusCode: 401,
          message: "Token inv\xE1lido"
        });
      }
      userId = user.id;
      const { data: salons, error: salonsError } = await supabaseAdmin.from("salons").select("*").eq("owner_id", userId).eq("is_active", true).order("created_at", { ascending: false });
      if (salonsError) {
        throw createError({
          statusCode: 500,
          message: "Erro ao buscar sal\xF5es"
        });
      }
      return {
        success: true,
        data: salons.map((s) => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          logoUrl: s.logo_url,
          phone: s.phone,
          description: s.description
        }))
      };
    }
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString());
      userId = decoded.userId;
    } catch {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const userSalons = [];
    localSalons.forEach((salon, id) => {
      if (salon.ownerId === userId) {
        userSalons.push({
          id: salon.id,
          name: salon.name,
          slug: salon.slug,
          logoUrl: null,
          phone: salon.phone,
          description: salon.description
        });
      }
    });
    return {
      success: true,
      data: userSalons
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const my_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: my_get
}, Symbol.toStringTag, { value: 'Module' }));

const services$2 = /* @__PURE__ */ new Map();
const _id__delete = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID do servi\xE7o \xE9 obrigat\xF3rio"
      });
    }
    const service = services$2.get(id);
    if (!service) {
      throw createError({
        statusCode: 404,
        message: "Servi\xE7o n\xE3o encontrado"
      });
    }
    services$2.delete(id);
    return {
      success: true,
      message: "Servi\xE7o removido com sucesso!"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const services$1 = /* @__PURE__ */ new Map();
const _id__put = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID do servi\xE7o \xE9 obrigat\xF3rio"
      });
    }
    const service = services$1.get(id);
    if (!service) {
      throw createError({
        statusCode: 404,
        message: "Servi\xE7o n\xE3o encontrado"
      });
    }
    const updatedService = {
      ...service,
      ...body,
      id: service.id,
      salonId: service.salonId,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    services$1.set(id, updatedService);
    return {
      success: true,
      message: "Servi\xE7o atualizado com sucesso!",
      data: updatedService
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const localServices = /* @__PURE__ */ new Map();
const index_get$4 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    const categoryId = query.categoryId;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin.from("services").select("*").eq("salon_id", salonId).order("name", { ascending: true });
      if (categoryId) {
        queryBuilder = queryBuilder.eq("category_id", categoryId);
      }
      const { data, error } = await queryBuilder;
      if (error) {
        console.error("Error fetching services:", error);
        throw createError({ statusCode: 500, message: error.message });
      }
      const services = (data || []).map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        categoryId: s.category_id,
        price: parseFloat(s.price) || 0,
        duration: s.duration,
        icon: s.icon || "lucide:sparkles",
        color: s.color || "#a855f7",
        isActive: s.is_active,
        isPopular: s.is_popular
      }));
      return {
        success: true,
        data: services,
        total: services.length
      };
    }
    let result = Array.from(localServices.values());
    result = result.filter((s) => s.salonId === salonId);
    if (categoryId) {
      result = result.filter((s) => s.categoryId === categoryId);
    }
    return {
      success: true,
      data: result,
      total: result.length
    };
  } catch (error) {
    console.error("Services GET error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4,
  localServices: localServices
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$2 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const body = await readBody(event);
    const { salonId, name, duration, price, description, icon, color, categoryId } = body;
    if (!salonId || !name || !duration || price === void 0) {
      throw createError({
        statusCode: 400,
        message: "Campos obrigat\xF3rios: salonId, name, duration, price"
      });
    }
    const isValidUUID = (str) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(str);
    };
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("services").insert({
        salon_id: salonId,
        category_id: categoryId && isValidUUID(categoryId) ? categoryId : null,
        name,
        description: description || null,
        duration: parseInt(duration),
        price: parseFloat(price),
        icon: icon || "lucide:sparkles",
        color: color || "#a855f7",
        is_active: true,
        is_featured: false
      }).select().single();
      if (error) {
        console.error("Supabase error creating service:", error);
        throw createError({ statusCode: 500, message: error.message });
      }
      return {
        success: true,
        message: "Servi\xE7o criado com sucesso!",
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
          categoryId: data.category_id,
          price: parseFloat(data.price),
          duration: data.duration,
          icon: data.icon,
          color: data.color,
          isActive: data.is_active
        }
      };
    }
    const serviceId = "srv-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
    const newService = {
      id: serviceId,
      salonId,
      categoryId: categoryId || null,
      name,
      description: description || null,
      duration: parseInt(duration),
      price: parseFloat(price),
      icon: icon || "lucide:sparkles",
      color: color || "#a855f7",
      isActive: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localServices.set(serviceId, newService);
    return {
      success: true,
      message: "Servi\xE7o criado com sucesso!",
      data: newService
    };
  } catch (error) {
    console.error("Service POST error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const localTransactions = /* @__PURE__ */ new Map();
const index_get$2 = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const query = getQuery$1(event);
    const salonId = query.salonId;
    const type = query.type;
    const date = query.date;
    const startDate = query.startDate;
    const endDate = query.endDate;
    if (!salonId) {
      throw createError({ statusCode: 400, message: "salonId \xE9 obrigat\xF3rio" });
    }
    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin.from("transactions").select("*").eq("salon_id", salonId).order("created_at", { ascending: false });
      if (type) {
        queryBuilder = queryBuilder.eq("type", type);
      }
      if (date) {
        queryBuilder = queryBuilder.eq("date", date);
      }
      if (startDate && endDate) {
        queryBuilder = queryBuilder.gte("date", startDate).lte("date", endDate);
      }
      const { data, error } = await queryBuilder;
      if (error) throw createError({ statusCode: 500, message: error.message });
      const transactions = (data || []).map((t) => ({
        id: t.id,
        type: t.type,
        category: t.category,
        description: t.description,
        amount: parseFloat(t.amount),
        paymentMethod: t.payment_method,
        date: t.date,
        createdAt: t.created_at
      }));
      const totalIncome2 = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
      const totalExpense2 = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
      return {
        success: true,
        data: transactions,
        summary: {
          totalIncome: totalIncome2,
          totalExpense: totalExpense2,
          balance: totalIncome2 - totalExpense2,
          count: transactions.length
        }
      };
    }
    let result = Array.from(localTransactions.values());
    result = result.filter((t) => t.salonId === salonId);
    if (type) {
      result = result.filter((t) => t.type === type);
    }
    if (date) {
      result = result.filter((t) => t.date === date);
    }
    if (startDate && endDate) {
      result = result.filter((t) => t.date >= startDate && t.date <= endDate);
    }
    const totalIncome = result.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = result.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    return {
      success: true,
      data: result,
      summary: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        count: result.length
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2,
  localTransactions: localTransactions
}, Symbol.toStringTag, { value: 'Module' }));

const index_post = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, message: "Token necess\xE1rio" });
    }
    const body = await readBody(event);
    const { salonId, type, category, description, amount, paymentMethod } = body;
    if (!salonId || !type || !description || !amount) {
      throw createError({ statusCode: 400, message: "Campos obrigat\xF3rios: salonId, type, description, amount" });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("transactions").insert({
        salon_id: salonId,
        type,
        category: category || (type === "income" ? "Servi\xE7o" : "Despesa"),
        description,
        amount,
        payment_method: paymentMethod || "cash",
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        is_paid: true,
        paid_at: (/* @__PURE__ */ new Date()).toISOString()
      }).select().single();
      if (error) throw createError({ statusCode: 500, message: error.message });
      return {
        success: true,
        data: {
          id: data.id,
          type: data.type,
          category: data.category,
          description: data.description,
          amount: parseFloat(data.amount),
          paymentMethod: data.payment_method,
          date: data.date,
          createdAt: data.created_at
        }
      };
    }
    const id = `trx-${Date.now()}`;
    const newTransaction = {
      id,
      salonId,
      type,
      category: category || (type === "income" ? "Servi\xE7o" : "Despesa"),
      description,
      amount,
      paymentMethod: paymentMethod || "cash",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localTransactions.set(id, newTransaction);
    return { success: true, data: newTransaction };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

const mockupSalon$1 = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  slug: "studio-belle-hair-mockup",
  name: "Studio Belle Hair [MOCKUP]",
  category: "Sal\xE3o de Beleza Completo",
  description: "Sal\xE3o de beleza completo especializado em cortes modernos, colora\xE7\xE3o, tratamentos capilares, manicure, pedicure e design de sobrancelhas.",
  logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&h=600&fit=crop",
  phone: "(79) 3333-4444",
  whatsapp: "79999998888",
  email: "contato@studiobellehair.com.br",
  instagram: "studiobellehair",
  facebook: "studiobellehair",
  address: "Av. Beira Mar, 1500 - Atalaia, Aracaju/SE",
  city: "Aracaju - SE",
  rating: 4.8,
  reviewCount: 127,
  isOpen: true,
  services: [
    { id: "serv-001", name: "Corte Feminino", price: 80, duration: 45 },
    { id: "serv-002", name: "Escova", price: 50, duration: 40 },
    { id: "serv-003", name: "Colora\xE7\xE3o", price: 180, duration: 120 },
    { id: "serv-007", name: "Manicure", price: 35, duration: 45 }
  ],
  team: [
    { id: "prof-ana-001", name: "Ana Paula", role: "Especialista em Colora\xE7\xE3o", rating: 4.9 },
    { id: "prof-maria-001", name: "Maria Clara", role: "Nail Designer", rating: 4.8 }
  ],
  title: "Studio Belle Hair [MOCKUP]",
  bio: "\u2728 Sal\xE3o de beleza completo \u2022 Cabelo, unhas e maquiagem \u2022 \u{1F4CD} Aracaju/SE",
  avatarUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
  background: "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fff1f2 100%)",
  showServices: true,
  showLocation: true,
  links: [
    { id: "1", title: "\u{1F4C5} Agendar Hor\xE1rio", url: "/salao/studio-belle-hair-mockup" },
    { id: "2", title: "\u{1F485} Nossos Servi\xE7os", url: "/salao/studio-belle-hair-mockup#servicos" },
    { id: "3", title: "\u{1F4CD} Como Chegar", url: "https://maps.google.com" }
  ]
};
const _slug__get = defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    if (!slug) {
      throw createError({
        statusCode: 400,
        message: "Slug \xE9 obrigat\xF3rio"
      });
    }
    if (slug === "studio-belle-hair-mockup") {
      return mockupSalon$1;
    }
    if (isSupabaseConfigured()) {
      const { data: salon, error: salonError } = await supabaseAdmin.from("salons").select("*").eq("slug", slug).eq("is_active", true).single();
      if (salonError || !salon) {
        throw createError({
          statusCode: 404,
          message: "Sal\xE3o n\xE3o encontrado"
        });
      }
      const { data: services } = await supabaseAdmin.from("services").select("id, name, price, duration, icon, color").eq("salon_id", salon.id).eq("is_active", true).order("name", { ascending: true }).limit(10);
      const { data: professionals } = await supabaseAdmin.from("professionals").select("id, name, bio, rating, avatar_url").eq("salon_id", salon.id).eq("is_active", true).limit(10);
      const { data: links } = await supabaseAdmin.from("link_bio_links").select("id, title, url, icon").eq("salon_id", salon.id).eq("is_active", true).order("sort_order", { ascending: true });
      return {
        id: salon.id,
        slug: salon.slug,
        name: salon.name,
        description: salon.description,
        logo: salon.logo_url,
        coverImage: salon.cover_url,
        phone: salon.phone,
        whatsapp: salon.whatsapp,
        email: salon.email,
        instagram: salon.instagram,
        facebook: salon.facebook,
        tiktok: salon.tiktok,
        address: [salon.address_street, salon.address_number, salon.address_neighborhood].filter(Boolean).join(", "),
        city: [salon.address_city, salon.address_state].filter(Boolean).join(" - "),
        rating: salon.rating || 0,
        reviewCount: salon.review_count || 0,
        isOpen: true,
        services: (services || []).map((s) => ({
          id: s.id,
          name: s.name,
          price: parseFloat(s.price) || 0,
          duration: s.duration,
          icon: s.icon || "lucide:sparkles",
          color: s.color || "#a855f7"
        })),
        team: (professionals || []).map((p) => ({
          id: p.id,
          name: p.name,
          role: p.bio,
          // bio is used as role
          rating: p.rating,
          avatar: p.avatar_url
        })),
        // Link Bio data
        title: salon.name,
        bio: salon.description || "",
        avatarUrl: salon.logo_url,
        background: "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fff1f2 100%)",
        showServices: true,
        showLocation: !!salon.address_street,
        links: (links || []).map((l) => ({
          id: l.id,
          title: l.title,
          url: l.url,
          icon: l.icon
        }))
      };
    }
    throw createError({
      statusCode: 404,
      message: "Sal\xE3o n\xE3o encontrado"
    });
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const _slug__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _slug__get
}, Symbol.toStringTag, { value: 'Module' }));

const MOCKUP_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const mockupSalon = {
  id: MOCKUP_ID,
  slug: "studio-belle-hair-mockup",
  name: "Studio Belle Hair [MOCKUP]",
  logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop",
  address: "Av. Beira Mar, 1500 - Atalaia, Aracaju/SE",
  category: "Sal\xE3o de Beleza Completo",
  rating: 4.8,
  reviewCount: 127,
  distance: "0.5 km",
  isOpen: true,
  isFavorite: false,
  featured: true,
  services: ["Corte", "Colora\xE7\xE3o", "Manicure", "Maquiagem", "Est\xE9tica", "Sobrancelha"],
  tags: ["Cabelo", "Unhas", "Maquiagem", "Est\xE9tica"]
};
const index_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const featured = query.featured === "true";
    const limit = parseInt(query.limit) || 20;
    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin.from("salons").select(`
          id,
          slug,
          name,
          description,
          logo_url,
          cover_url,
          address_street,
          address_number,
          address_neighborhood,
          address_city,
          address_state,
          rating,
          review_count,
          is_featured,
          is_active
        `).eq("is_active", true).order("created_at", { ascending: false }).limit(limit);
      if (featured) {
        queryBuilder = queryBuilder.eq("is_featured", true);
      }
      const { data, error } = await queryBuilder;
      if (error) {
        console.error("Error fetching salons:", error);
        throw createError({ statusCode: 500, message: error.message });
      }
      const salons = [];
      for (const salon of data || []) {
        const { data: services } = await supabaseAdmin.from("services").select("name").eq("salon_id", salon.id).eq("is_active", true).limit(6);
        const address = [
          salon.address_street,
          salon.address_number,
          salon.address_neighborhood,
          salon.address_city,
          salon.address_state
        ].filter(Boolean).join(", ") || "Endere\xE7o n\xE3o informado";
        salons.push({
          id: salon.id,
          slug: salon.slug,
          name: salon.name,
          logo: salon.logo_url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
          coverImage: salon.cover_url || "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop",
          address,
          category: "Sal\xE3o de Beleza",
          rating: salon.rating || 0,
          reviewCount: salon.review_count || 0,
          distance: "-",
          isOpen: true,
          isFavorite: false,
          featured: salon.is_featured,
          services: (services || []).map((s) => s.name),
          tags: (services || []).slice(0, 4).map((s) => s.name)
        });
      }
      return {
        success: true,
        data: salons,
        total: salons.length
      };
    }
    return {
      success: true,
      data: [mockupSalon],
      total: 1
    };
  } catch (error) {
    console.error("Salons GET error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"]) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? stringify(opts.data, opts.ssrContext["~payloadReducers"]) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const renderer = defineRenderHandler(async (event) => {
	const nitroApp = useNitroApp();
	// Whether we're rendering an error page
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	// Initialize ssr context
	const ssrContext = createSSRContext(event);
	// needed for hash hydration plugin to work
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			// eslint-disable-next-line @typescript-eslint/no-deprecated
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		setSSRError(ssrContext, ssrError);
	}
	// Get route options (for `ssr: false`, `isr`, `cache` and `noScripts`)
	const routeOptions = getRouteRules(event);
	// Whether we are prerendering route or using ISR/SWR caching
	const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (_PAYLOAD_EXTRACTION || routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
	}
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME) + "?" + ssrContext.runtimeConfig.app.buildId : undefined;
	// Render app
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		// We use error to bypass full render if we have an early response we can make
		// TODO: remove _renderResponse in nuxt v5
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		// Use explicitly thrown error in preference to subsequent rendering errors
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	// Render inline styles
	// TODO: remove _renderResponse in nuxt v5
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		// TODO: remove _renderResponse in nuxt v5
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	// Handle errors
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	// Directly render payload routes
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	// Setup head
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	// 1. Preload payloads and app manifest
	if (_PAYLOAD_EXTRACTION && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			crossorigin: "anonymous",
			href: payloadURL
		} ] }, headEntryOptions);
	}
	if (ssrContext["~preloadManifest"] && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			fetchpriority: "low",
			crossorigin: "anonymous",
			href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`)
		}] }, {
			...headEntryOptions,
			tagPriority: "low"
		});
	}
	// 2. Styles
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		// Do not add links to resources that are inlined (vite v5+)
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		// Add CSS links in <head> for CSS files
		// - in production
		// - in dev mode when not rendering an island
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		// 4. Resource Hints
		// Remove lazy hydrated modules from ssrContext.modules so they don't get preloaded
		// (CSS links are already added above, this only affects JS preloads)
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		// TODO: add priorities based on Capo
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		// 5. Payloads
		ssrContext.head.push({ script: _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({
			ssrContext,
			data: splitPayload(ssrContext).initial,
			src: payloadURL
		})  : renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  }, {
			...headEntryOptions,
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	// 6. Scripts
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	// Create render context
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	// Allow hooking into the rendered result
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	// Construct HTML response
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
});
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
