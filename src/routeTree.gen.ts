import { Route as rootRouteImport } from './routes/__root'
import { Route as SitemapDotxmlRouteImport } from './routes/sitemap[.]xml'
import { Route as ReadmeRouteImport } from './routes/readme'
import { Route as JoinRouteImport } from './routes/join'
import { Route as GenerationsRouteImport } from './routes/generations'
import { Route as AdminRouteImport } from './routes/admin'
import { Route as SplatRouteImport } from './routes/$'
import { Route as IndexRouteImport } from './routes/index'

const SitemapDotxmlRoute = SitemapDotxmlRouteImport.update({
  id: '/sitemap.xml',
  path: '/sitemap.xml',
  getParentRoute: () => rootRouteImport,
} as any)
const ReadmeRoute = ReadmeRouteImport.update({
  id: '/readme',
  path: '/readme',
  getParentRoute: () => rootRouteImport,
} as any)
const JoinRoute = JoinRouteImport.update({
  id: '/join',
  path: '/join',
  getParentRoute: () => rootRouteImport,
} as any)
const GenerationsRoute = GenerationsRouteImport.update({
  id: '/generations',
  path: '/generations',
  getParentRoute: () => rootRouteImport,
} as any)
const AdminRoute = AdminRouteImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRouteImport,
} as any)
const SplatRoute = SplatRouteImport.update({
  id: '/$',
  path: '/$',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$': typeof SplatRoute
  '/admin': typeof AdminRoute
  '/generations': typeof GenerationsRoute
  '/join': typeof JoinRoute
  '/readme': typeof ReadmeRoute
  '/sitemap.xml': typeof SitemapDotxmlRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$': typeof SplatRoute
  '/admin': typeof AdminRoute
  '/generations': typeof GenerationsRoute
  '/join': typeof JoinRoute
  '/readme': typeof ReadmeRoute
  '/sitemap.xml': typeof SitemapDotxmlRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/$': typeof SplatRoute
  '/admin': typeof AdminRoute
  '/generations': typeof GenerationsRoute
  '/join': typeof JoinRoute
  '/readme': typeof ReadmeRoute
  '/sitemap.xml': typeof SitemapDotxmlRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/$'
    | '/admin'
    | '/generations'
    | '/join'
    | '/readme'
    | '/sitemap.xml'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/$'
    | '/admin'
    | '/generations'
    | '/join'
    | '/readme'
    | '/sitemap.xml'
  id:
    | '__root__'
    | '/'
    | '/$'
    | '/admin'
    | '/generations'
    | '/join'
    | '/readme'
    | '/sitemap.xml'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SplatRoute: typeof SplatRoute
  AdminRoute: typeof AdminRoute
  GenerationsRoute: typeof GenerationsRoute
  JoinRoute: typeof JoinRoute
  ReadmeRoute: typeof ReadmeRoute
  SitemapDotxmlRoute: typeof SitemapDotxmlRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/sitemap.xml': {
      id: '/sitemap.xml'
      path: '/sitemap.xml'
      fullPath: '/sitemap.xml'
      preLoaderRoute: typeof SitemapDotxmlRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/readme': {
      id: '/readme'
      path: '/readme'
      fullPath: '/readme'
      preLoaderRoute: typeof ReadmeRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/join': {
      id: '/join'
      path: '/join'
      fullPath: '/join'
      preLoaderRoute: typeof JoinRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/generations': {
      id: '/generations'
      path: '/generations'
      fullPath: '/generations'
      preLoaderRoute: typeof GenerationsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/$': {
      id: '/$'
      path: '/$'
      fullPath: '/$'
      preLoaderRoute: typeof SplatRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SplatRoute: SplatRoute,
  AdminRoute: AdminRoute,
  GenerationsRoute: GenerationsRoute,
  JoinRoute: JoinRoute,
  ReadmeRoute: ReadmeRoute,
  SitemapDotxmlRoute: SitemapDotxmlRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
