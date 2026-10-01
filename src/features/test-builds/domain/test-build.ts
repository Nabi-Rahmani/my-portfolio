/**
 * DOMAIN — client test-build content model.
 * iOS is unrepresentable: the platform union has no `ios` member.
 * Allowed formats and architectures per platform mirror Spec Requirements 26-27
 * so they drive both types and runtime validation.
 */

export type TestBuildPlatform = 'android' | 'windows' | 'macos' | 'linux';

export type AndroidFormat = 'apk';
export type WindowsFormat = 'exe' | 'msi' | 'msix' | 'zip';
export type MacosFormat = 'dmg' | 'pkg' | 'zip';
export type LinuxFormat = 'appimage' | 'deb' | 'rpm' | 'tar.gz';

export type TestBuildFormat =
  | AndroidFormat
  | WindowsFormat
  | MacosFormat
  | LinuxFormat;

export type AndroidArch = 'universal' | 'arm64-v8a' | 'armeabi-v7a' | 'x86_64';
export type WindowsArch = 'x64' | 'arm64';
export type MacosArch = 'universal' | 'arm64' | 'x64';
export type LinuxArch = 'x64' | 'arm64';

export type TestBuildArch = AndroidArch | WindowsArch | MacosArch | LinuxArch;

interface TestBuildArtifactBase {
  url: string;
  fileName?: string;
  sizeBytes?: number;
  sha256?: string;
  minOs?: string;
}

export interface AndroidArtifact extends TestBuildArtifactBase {
  platform: 'android';
  format: AndroidFormat;
  arch?: AndroidArch;
}

export interface WindowsArtifact extends TestBuildArtifactBase {
  platform: 'windows';
  format: WindowsFormat;
  arch?: WindowsArch;
}

export interface MacosArtifact extends TestBuildArtifactBase {
  platform: 'macos';
  format: MacosFormat;
  arch?: MacosArch;
}

export interface LinuxArtifact extends TestBuildArtifactBase {
  platform: 'linux';
  format: LinuxFormat;
  arch?: LinuxArch;
}

/** Discriminated artifact union — switch on `platform` for format/arch narrowing. */
export type TestBuildArtifact =
  | AndroidArtifact
  | WindowsArtifact
  | MacosArtifact
  | LinuxArtifact;

export interface TestBuildRelease {
  version: string;
  buildNumber?: string;
  /** ISO date string (date-only `YYYY-MM-DD` or full ISO). */
  releasedAt: string;
  /** Non-empty list of what changed in this build. */
  changes: string[];
  knownIssues?: string[];
  artifacts: TestBuildArtifact[];
}

export interface TestBuildApp {
  /** Unique kebab-case identifier, also used for the `#build-<slug>` anchor. */
  slug: string;
  name: string;
  /** Optional client label — omit when the client name must stay private. */
  client?: string;
  /** Display-only toolchain label (e.g. "Flutter", "Kotlin"). Never branched on. */
  builtWith?: string;
  summary: string;
  icon?: string;
  /** Stays in data but excluded from every render helper when true. */
  hidden?: boolean;
  releases: TestBuildRelease[];
}
