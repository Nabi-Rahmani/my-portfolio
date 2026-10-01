import { getTestBuildDisplayFileName } from '@/features/test-builds/data/test-builds';
import { getInstallGuide } from '@/features/test-builds/application/install-steps';
import type {
  TestBuildArtifact,
  TestBuildPlatform,
} from '@/features/test-builds/domain/test-build';

import { CopyButton } from './CopyButton';
import { QrToggle } from './QrToggle';
import { PlatformBadge } from './TestBuildDevice';
import { PlatformIcon } from './PlatformIcon';

export const PLATFORM_ORDER: TestBuildPlatform[] = [
  'android',
  'windows',
  'macos',
  'linux',
];

export const PLATFORM_LABELS: Record<TestBuildPlatform, string> = {
  android: 'Android',
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
};

export function formatTestBuildSize(sizeBytes: number): string {
  if (sizeBytes < 1024) return `${sizeBytes} B`;
  if (sizeBytes < 1024 * 1024) return `${Math.round(sizeBytes / 1024)} KB`;
  if (sizeBytes < 1024 * 1024 * 1024) {
    const mb = sizeBytes / (1024 * 1024);
    return `${trimOneDecimal(mb)} MB`;
  }
  const gb = sizeBytes / (1024 * 1024 * 1024);
  return `${trimOneDecimal(gb)} GB`;
}

function trimOneDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function formatLabel(format: string): string {
  if (format.toLowerCase() === 'appimage') return '.AppImage';
  return `.${format.toLowerCase()}`;
}

function downloadAccessibleName(
  platform: TestBuildPlatform,
  artifact: TestBuildArtifact,
): string {
  const parts = [
    `Download for ${PLATFORM_LABELS[platform]}`,
    formatLabel(artifact.format),
  ];
  if (artifact.arch) parts.push(artifact.arch);
  if (typeof artifact.sizeBytes === 'number') {
    parts.push(formatTestBuildSize(artifact.sizeBytes));
  }
  return parts.join(', ');
}

function CopyableCode({
  label,
  text,
  wrap = 'scroll',
}: {
  label: string;
  text: string;
  wrap?: 'scroll' | 'all';
}) {
  return (
    <div className="mt-3">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--text-faint)]">
        {label}
      </p>
      <div className="mt-1 flex items-start gap-2">
        <code
          title={text}
          className={[
            'min-w-0 flex-1 rounded-[var(--radius-chip)] border border-[var(--line-16)] bg-[var(--panel-bg)] px-3 py-2 font-mono text-xs leading-5 text-[var(--text-strong)]',
            wrap === 'scroll'
              ? 'overflow-x-auto whitespace-pre'
              : 'overflow-x-auto break-all',
          ].join(' ')}
        >
          {text}
        </code>
        <CopyButton text={text} label={`Copy ${label}: ${text}`} small />
      </div>
    </div>
  );
}

function ArtifactMeta({ artifact }: { artifact: TestBuildArtifact }) {
  const bits: string[] = [formatLabel(artifact.format)];
  if (artifact.arch) bits.push(artifact.arch);
  if (artifact.minOs) bits.push(`Requires ${artifact.minOs}`);
  if (typeof artifact.sizeBytes === 'number') {
    bits.push(formatTestBuildSize(artifact.sizeBytes));
  }
  return (
    <span className="font-mono text-xs text-[var(--text-muted)]">
      {bits.join(' · ')}
    </span>
  );
}

function PrimaryDownload({
  platform,
  artifact,
}: {
  platform: TestBuildPlatform;
  artifact: TestBuildArtifact;
}) {
  const fileName = getTestBuildDisplayFileName(artifact);
  return (
    <div>
      <a
        href={artifact.url}
        aria-label={downloadAccessibleName(platform, artifact)}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
      >
        <PlatformIcon platform={platform} />
        <span className="truncate">
          Download for {PLATFORM_LABELS[platform]}
        </span>
      </a>
      <p className="mt-2 truncate font-mono text-xs text-[var(--text-muted)]" title={fileName}>
        {fileName}
      </p>
      <p className="mt-1">
        <ArtifactMeta artifact={artifact} />
      </p>
      {platform === 'android' ? (
        <QrToggle artifactUrl={artifact.url} />
      ) : null}
    </div>
  );
}

function SecondaryDownload({
  platform,
  artifact,
}: {
  platform: TestBuildPlatform;
  artifact: TestBuildArtifact;
}) {
  const fileName = getTestBuildDisplayFileName(artifact);
  return (
    <li className="border-t border-[var(--line-16)] py-3 first:border-t-0 first:pt-0 last:pb-0">
      <a
        href={artifact.url}
        aria-label={downloadAccessibleName(platform, artifact)}
        className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-strong)] underline underline-offset-4"
      >
        <PlatformIcon platform={platform} />
        <span className="break-all normal-case tracking-normal">{fileName}</span>
      </a>
      <p className="mt-1">
        <ArtifactMeta artifact={artifact} />
      </p>
    </li>
  );
}

function InstallDisclosure({
  platform,
  artifacts,
}: {
  platform: TestBuildPlatform;
  artifacts: TestBuildArtifact[];
}) {
  const seen = new Set<string>();
  const formats = artifacts
    .map((artifact) => artifact.format)
    .filter((format) => {
      if (seen.has(format)) return false;
      seen.add(format);
      return true;
    });

  return (
    <details className="group mt-4 rounded-[var(--radius-tile)] border border-[var(--line-16)] bg-[var(--surface-bg)]">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        <span>How to install</span>
        <span aria-hidden className="font-mono text-xs text-[var(--text-muted)] group-open:hidden">
          +
        </span>
        <span aria-hidden className="hidden font-mono text-xs text-[var(--text-muted)] group-open:inline">
          −
        </span>
      </summary>
      <div className="space-y-6 border-t border-[var(--line-16)] px-4 py-4">
        {formats.map((format) => {
          const representative = artifacts.find((a) => a.format === format);
          if (!representative) return null;
          const fileName = getTestBuildDisplayFileName(representative);
          const guide = getInstallGuide(platform, format, fileName);
          return (
            <div key={format}>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                {formatLabel(format)}
              </p>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-[var(--text-muted)]">
                {guide.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              {guide.commands.map((command) => (
                <CopyableCode
                  key={command.command}
                  label={command.label}
                  text={command.command}
                />
              ))}
            </div>
          );
        })}
      </div>
    </details>
  );
}

export function PlatformGroup({
  platform,
  artifacts,
}: {
  platform: TestBuildPlatform;
  artifacts: TestBuildArtifact[];
}) {
  if (artifacts.length === 0) return null;
  const [primary, ...rest] = artifacts;
  return (
    <div
      data-test-build-platform={platform}
      className="relative rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)] p-5 pt-11 has-[[data-tb-badge]]:border-[var(--accent)] sm:p-6 sm:pt-11"
    >
      <PlatformBadge platform={platform} />
      <h4 className="flex items-center gap-2 text-[0.92rem] font-semibold">
        <span aria-hidden className="text-[var(--text-muted)]">
          <PlatformIcon platform={platform} />
        </span>
        {PLATFORM_LABELS[platform]}
      </h4>
      <div className="mt-4">
        <PrimaryDownload platform={platform} artifact={primary} />
      </div>
      {rest.length > 0 ? (
        <div className="mt-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-faint)]">
            Other downloads
          </p>
          <ul className="mt-2">
            {rest.map((artifact, index) => (
              <SecondaryDownload
                key={`${artifact.url}-${index}`}
                platform={platform}
                artifact={artifact}
              />
            ))}
          </ul>
        </div>
      ) : null}
      <InstallDisclosure platform={platform} artifacts={artifacts} />
    </div>
  );
}
