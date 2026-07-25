import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Nabi Rahmani, a Flutter product engineer with 3+ years of experience shipping dependable mobile products from Ankara.',
  openGraph: {
    title: 'About Nabi Rahmani · Flutter Product Engineer',
    description:
      'Product judgment, engineering principles, shipped work, and a clear path to contact.',
    url: 'https://codewithnabi.dev/about',
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
