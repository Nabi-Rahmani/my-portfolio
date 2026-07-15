import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nabi Rahmani — Flutter developer from Afghanistan based in Ankara. Story, shipped apps, and how to get in touch for freelance or full-time remote.',
  openGraph: {
    title: 'About · Muhammad Nabi Rahmani',
    description:
      'Personal story, shipping principles, and a clear path to contact — Flutter / mobile engineer available for freelance and full-time remote.',
    url: 'https://codewithnabi.dev/about',
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
