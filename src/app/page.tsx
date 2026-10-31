import { getArticleCount } from '@/core/config/proof';
import { getFeaturedPostSummaries } from '@/features/blog/data/blog';
import HomePage from '@/features/home/presentation/editorial/HomePage';
import { getFeaturedProjects } from '@/features/projects/data/projects';

/**
 * ROUTE — home.
 * Job: pass catalogs into the editorial home page.
 */
export default function Home() {
  return (
    <>
      <HomePage
        projects={getFeaturedProjects()}
        notes={getFeaturedPostSummaries()}
        articleCount={getArticleCount()}
      />
    </>
  );
}
