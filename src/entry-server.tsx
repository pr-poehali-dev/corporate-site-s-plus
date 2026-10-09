import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import type { Preload } from './lib/preload';

export function render(url: string, preload: Preload) {
  (globalThis as { __BLOG_PRELOAD__?: Preload }).__BLOG_PRELOAD__ = preload;
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/page/:page" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </StaticRouter>
  );
}

export * from './lib/blogSeo';
