import type {
  TestBuildFormat,
  TestBuildPlatform,
} from '@/features/test-builds/domain/test-build';

export interface InstallCommand {
  label: string;
  command: string;
}

export interface InstallGuide {
  steps: string[];
  commands: InstallCommand[];
  verify?: InstallCommand;
}

/** Quote a file name safely for POSIX shells and PowerShell display. */
export function shellQuote(name: string): string {
  if (/^[A-Za-z0-9._-]+$/.test(name)) return name;
  return `'${name.replace(/'/g, `'\\''`)}'`;
}

function powershellLiteralPath(fileName: string): string {
  if (/^[A-Za-z0-9._-]+$/.test(fileName)) return `.\\${fileName}`;
  return `.\\'${fileName.replace(/'/g, "''")}'`;
}

function posixChecksumCheck(
  fileName: string,
  sha256: string,
  tool: 'shasum -a 256' | 'sha256sum',
): string {
  return `echo ${shellQuote(`${sha256.toLowerCase()}  ${fileName}`)} | ${tool} -c -`;
}

type GuideKey =
  | 'android:apk'
  | 'windows:exe'
  | 'windows:msi'
  | 'windows:msix'
  | 'windows:zip'
  | 'macos:dmg'
  | 'macos:pkg'
  | 'macos:zip'
  | 'linux:appimage'
  | 'linux:deb'
  | 'linux:rpm'
  | 'linux:tar.gz';

function guide(
  steps: string[],
  commands: InstallCommand[] = [],
): Omit<InstallGuide, 'verify'> {
  return { steps, commands };
}

const GUIDES: Record<GuideKey, Omit<InstallGuide, 'verify'>> = {
  'android:apk': guide(
    [
      'Download the .apk on your Android phone and open it from the browser or the Files app.',
      'When prompted, allow “Install unknown apps” for that app, then choose Install.',
      'If Play Protect warns about an unknown app, choose “Install anyway”.',
      'If you see “App not installed”, uninstall the previous test build first — it may be signed with a different key.',
    ],
  ),
  'windows:exe': guide(
    [
      'Run the downloaded file.',
      'If SmartScreen shows “Windows protected your PC”, choose “More info → Run anyway”.',
    ],
  ),
  'windows:msi': guide(
    [
      'Run the downloaded file.',
      'If SmartScreen shows “Windows protected your PC”, choose “More info → Run anyway”.',
    ],
  ),
  'windows:msix': guide(
    [
      'Open the .msix file to install it.',
      'A self-signed package may need its certificate trusted first — follow the prompt Windows shows.',
    ],
  ),
  'windows:zip': guide(
    [
      'Choose “Extract all” and open the extracted folder.',
      'Run the app’s .exe from inside that folder.',
      'Keep every file in that folder together — desktop bundles need the DLLs and the data folder next to the .exe.',
    ],
  ),
  'macos:dmg': guide(
    [
      'Open the .dmg and drag the app to Applications.',
      'Launch it from Applications.',
      'If the first launch is blocked as an unidentified developer, go to “System Settings → Privacy & Security → Open Anyway”.',
    ],
  ),
  'macos:zip': guide(
    [
      'Unzip the download, then move the .app to Applications.',
      'Launch it from Applications.',
      'If the first launch is blocked as an unidentified developer, go to “System Settings → Privacy & Security → Open Anyway”.',
    ],
  ),
  'macos:pkg': guide(
    [
      'Run the installer package and follow its steps.',
      'If the first launch is blocked as an unidentified developer, go to “System Settings → Privacy & Security → Open Anyway”.',
    ],
  ),
  'linux:appimage': guide(
    [
      'Make the file executable, then run it.',
      'Keep the file where it is — it runs in place.',
    ],
  ),
  'linux:deb': guide(
    ['Install the package, then launch the app from your applications menu.'],
  ),
  'linux:rpm': guide(
    ['Install the package, then launch the app from your applications menu.'],
  ),
  'linux:tar.gz': guide(
    [
      'Extract the archive and run the bundled executable.',
      'Keep the folder contents together — the app needs the files next to the executable.',
    ],
  ),
};

/**
 * Typed install guidance keyed by platform + format only — never by
 * `builtWith`. Commands carry the artifact's real display file name.
 */
export function getInstallGuide(
  platform: TestBuildPlatform,
  format: TestBuildFormat,
  fileName: string,
  sha256?: string,
): InstallGuide {
  const key = `${platform}:${format}` as GuideKey;
  const base = GUIDES[key];
  if (!base) {
    throw new Error(
      `[test-builds] No install guide for platform "${platform}" with format "${format}".`,
    );
  }
  const quoted = shellQuote(fileName);
  const commands: InstallCommand[] = [...base.commands];

  if (platform === 'linux' && format === 'appimage') {
    commands.unshift({
      label: 'Make executable and run',
      command: `chmod +x ${quoted} && ./${quoted}`,
    });
  } else if (platform === 'linux' && format === 'deb') {
    commands.unshift({
      label: 'Install',
      command: `sudo apt install ./${quoted}`,
    });
  } else if (platform === 'linux' && format === 'rpm') {
    commands.unshift({
      label: 'Install',
      command: `sudo dnf install ./${quoted}`,
    });
  } else if (platform === 'linux' && format === 'tar.gz') {
    commands.unshift({
      label: 'Extract',
      command: `tar -xzf ${quoted}`,
    });
  }

  let verify: InstallCommand | undefined;
  if (sha256) {
    if (platform === 'macos') {
      verify = {
        label: 'Verify SHA-256 (macOS)',
        command: posixChecksumCheck(fileName, sha256, 'shasum -a 256'),
      };
    } else if (platform === 'windows') {
      verify = {
        label: 'Verify SHA-256 (PowerShell)',
        command: `(Get-FileHash -Algorithm SHA256 ${powershellLiteralPath(fileName)}).Hash -eq '${sha256.toUpperCase()}'`,
      };
    } else if (platform === 'linux') {
      verify = {
        label: 'Verify SHA-256 (Linux)',
        command: posixChecksumCheck(fileName, sha256, 'sha256sum'),
      };
    }
  }

  return { steps: base.steps, commands, verify };
}
