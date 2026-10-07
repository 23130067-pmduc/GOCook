import React, { useEffect } from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { legacyPages } from '../legacy/pages';

export default function LegacyPage({ path }) {
  const page = legacyPages[path];
  useEffect(() => { if (page?.title) document.title = page.title; }, [page]);
  if (!page) return <SiteLayout><main id="main"><div className="container section"><div className="card"><h1>Không tìm thấy trang</h1></div></div></main></SiteLayout>;
  return <SiteLayout><main id="main" dangerouslySetInnerHTML={{ __html: page.html }} /></SiteLayout>;
}
