import { contactMailto } from '@/core/config/site';
import {
  formatTestBuildDate,
  getSortedReleases,
  getTestBuildDisplayFileName,
} from '@/features/test-builds/data/test-builds';
import type {
  TestBuildApp,
  TestBuildArtifact,
  TestBuildRelease,
} from '@/features/test-builds/domain/test-build';

import {
  formatLabel,
  formatTestBuildSize,
  PLATFORM_LABELS,
  PLATFORM_ORDER,
  PlatformGroup,
} from './PlatformGroup';
import { PlatformIcon } from './PlatformIcon';

function compactAccessibleName(artifact: TestBuildArtifact): string {
  const parts = [
    `Download for ${PLATFORM_LABELS[artifact.platform]}`,
    formatLabel(artifact.format),
  ];
  if (typeof artifact.sizeBytes === 'number') {
    parts.push(formatTestBuildSize(artifact.sizeBytes));
  }
  return parts.join(', ');
}

function CompactArtifactLink({
  release,
  artifact,
}: {
  release: TestBuildRelease;
  artifact: TestBuildArtifact;
}) {
  const fileName = getTestBuildDisplayFileName(artifact);
  return (
    <a
      href={artifact.url}
      aria-label={`${compactAccessibleName(artifact)}, version ${release.version}`}
      className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-[var(--text-strong)] underline underline-offset-4"
    >
      <PlatformIcon platform={artifact.platform} />
      <span className="break-all">
        {PLATFORM_LABELS[artifact.platform]} {formatLabel(artifact.format)}
      </span>
      <span className="sr-only">({fileName})</span>
    </a>
  );
}

function EarlierBuilds({
  app,
  earlier,
}: {
  app: TestBuildApp;
  earlier: TestBuildRelease[];
}) {
  if (earlier.length === 0) return null;
  return (
    <details className="group mt-6 rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)]">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        <span>Earlier builds ({earlier.length})</span>
        <span aria-hidden className="font-mono text-xs text-[var(--text-muted)] group-open:hidden">
          +
        </span>
        <span aria-hidden className="hidden font-mono text-xs text-[var(--text-muted)] group-open:inline">
          −
        </span>
      </summary>
      <ol className="space-y-5 border-t border-[var(--line-16)] px-5 py-5">
        {earlier.map((release) => (
          <li key={`${app.slug}-${release.version}`}>
            <p className="text-sm font-semibold">
              <span className="font-mono">{release.version}</span>
              {release.buildNumber ? (
                <span className="font-mono text-[var(--text-muted)]">
                  {' '}
                  (build {release.buildNumber})
                </span>
              ) : null}
              <span className="ml-2 font-normal text-[var(--text-muted)]">
                {formatTestBuildDate(release.releasedAt)}
              </span>
            </p>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {release.artifacts.map((artifact, index) => (
                <li key={`${artifact.url}-${index}`}>
                  <CompactArtifactLink release={release} artifact={artifact} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </details>
  );
}

export function TestBuildAppCard({ app }: { app: TestBuildApp }) {
  const sorted = getSortedReleases(app);
  const latest = sorted[0];
  if (!latest) return null;
  const earlier = sorted.slice(1);

  const versionLine = latest.buildNumber
    ? `${latest.version} (build ${latest.buildNumber})`
    : latest.version;
  const reportSubject = `Feedback: ${app.name} ${versionLine}`;

  const grouped = PLATFORM_ORDER.map((platform) => ({
    platform,
    artifacts: latest.artifacts.filter(
      (artifact) => artifact.platform === platform,
    ),
  })).filter((group) => group.artifacts.length > 0);

  return (
    <article
      id={`build-${app.slug}`}
      aria-labelledby={`build-${app.slug}-title`}
      className="scroll-mt-24 rounded-[28px] border border-[var(--line-18)] bg-[var(--surface-bg)] p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        {app.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={app.icon}
            alt=""
            aria-hidden
            className="h-12 w-12 shrink-0 rounded-[var(--radius-tile)] border border-[var(--line-16)] object-cover"
          />
        ) : null}
        <div className="min-w-0">
          <h3
            id={`build-${app.slug}-title`}
            className="scroll-mt-24 text-[1.15rem] font-semibold tracking-[-0.02em]"
          >
            {app.name}
          </h3>
          <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
            {app.client ? <span>For {app.client}</span> : null}
            {app.builtWith ? (
              <span>
                Built with <span className="font-medium">{app.builtWith}</span>
              </span>
            ) : null}
          </p>
        </div>
      </div>

      <p className="mt-4 max-w-[70ch] text-[0.95rem] leading-7 text-[var(--text-muted)]">
        {app.summary}
      </p>

      <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
        <span className="text-[var(--text-strong)]">{latest.version}</span>
        {latest.buildNumber ? ` (build ${latest.buildNumber})` : null}
        {' · '}
        {formatTestBuildDate(latest.releasedAt)}
      </p>

      <div className="mt-5">
        <h4 className="text-[0.9rem] font-semibold">What’s in this build</h4>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-[var(--text-muted)]">
          {latest.changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </div>

      {latest.knownIssues && latest.knownIssues.length > 0 ? (
        <div className="mt-5">
          <h4 className="text-[0.9rem] font-semibold">Known issues</h4>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-[var(--text-muted)]">
            {latest.knownIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {grouped.map((group) => (
          <PlatformGroup
            key={group.platform}
            platform={group.platform}
            artifacts={group.artifacts}
          />
        ))}
      </div>

      <EarlierBuilds app={app} earlier={earlier} />

      <div className="mt-6">
        <a
          href={contactMailto({ subject: reportSubject })}
          className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-24)] px-5 py-2 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none"
        >
          Report an issue
        </a>
      </div>
    </article>
  );
}
