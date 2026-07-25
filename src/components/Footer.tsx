import { cn } from '@/lib/utils';

interface FooterProps {
  showSocials?: boolean;
  links?: { label: string; href: string }[];
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('flex flex-col gap-1 border-t border-[var(--line-16)] bg-[#120E09] px-5 py-[18px] font-mono text-[11.5px] text-[#94886F] min-[760px]:flex-row min-[760px]:items-center min-[760px]:justify-between min-[760px]:px-10', className)}>
      <span>© {new Date().getFullYear()} MUHAMMAD NABI RAHMANI</span>
      <span>FLUTTER ENGINEER · ANKARA</span>
    </footer>
  );
}
