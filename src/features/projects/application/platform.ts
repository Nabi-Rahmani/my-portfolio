import type { Project } from '@/features/projects/domain/project';

/**
 * APPLICATION — visitor-facing platform label.
 * Job: map domain `Project.platform` to a short display string.
 */
export function platformLabel(platform: Project['platform']): string {
  if (platform === 'android') return 'Android';
  if (platform === 'ios') return 'iOS';
  return 'Android · iOS planned';
}
