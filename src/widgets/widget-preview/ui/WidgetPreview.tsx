import { ThemePicker } from '@features/select-theme';
import { StatsToggle } from '@features/toggle-stat';
import type { StatKey } from '@entities/widget-stat';

export function WidgetPreview({
  themeId,
  onThemeChange,
  visibleStats,
  onToggleStat,
  imageUrl,
  t,
}: {
  themeId: string;
  onThemeChange: (id: string) => void;
  visibleStats: StatKey[];
  onToggleStat: (key: StatKey) => void;
  imageUrl: string;
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-end">
      <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-60">
        <ThemePicker themeId={themeId} onChange={onThemeChange} t={t} />

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-neutral-500">{t('statsToShow')}</span>
          <StatsToggle visibleStats={visibleStats} onToggle={onToggleStat} t={t} />
        </div>
      </aside>

      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-[#30363d] bg-[#0d1117] shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-6 py-3">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 fill-[#7d8590]">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.18.73.84.82 1.1.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
          <span className="text-xs font-medium text-[#7d8590]">{t('readmePreview')}</span>
        </div>

        <div className="flex flex-col gap-8 p-6 sm:flex-row sm:p-8">
          <aside className="flex w-full shrink-0 flex-col gap-3 sm:w-52">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22]">
              <svg viewBox="0 0 24 24" className="h-14 w-14 fill-[#6e7681]">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-9 2.24-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.76-4.58-5-9-5Z" />
              </svg>
            </div>

            <div>
              <p className="text-lg font-semibold leading-tight text-[#e6edf3]">{t('mockName')}</p>
              <p className="text-sm text-[#7d8590]">{t('mockUsername')}</p>
            </div>

            <button
              type="button"
              disabled
              className="rounded-md border border-[#30363d] bg-[#21262d] py-1 text-xs font-medium text-[#e6edf3]"
            >
              {t('editProfile')}
            </button>

            <div className="flex items-center gap-1.5 text-xs text-[#e6edf3]">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 fill-[#7d8590]">
                <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 1 1-1.44.418 3.51 3.51 0 0 0-2.6-2.41.75.75 0 0 1-.14-1.435A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Z" />
              </svg>
              {t('mockFollowers')}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#7d8590]">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 fill-[#7d8590]">
                <path d="M11.536 3.464a5 5 0 0 1 0 7.072L8 14.07l-3.536-3.535a5 5 0 1 1 7.072-7.07ZM8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              </svg>
              {t('mockLocation')}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-2 border-b border-[#30363d] pb-3 text-sm text-[#7d8590]">
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 fill-[#7d8590]">
                <path d="M2 1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25Zm1.75-.25a.25.25 0 0 0-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 8 4.25V1.5Zm5.5.56V4.25c0 .138.112.25.25.25h2.19Z" />
              </svg>
              <span className="font-mono text-xs">README.md</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="h-3 w-2/3 rounded-full bg-[#21262d]" />
              <span className="h-3 w-full rounded-full bg-[#21262d]" />
              <span className="h-3 w-5/6 rounded-full bg-[#21262d]" />
            </div>

            <div className="mt-6 flex justify-center sm:justify-start">
              <img src={imageUrl} alt="Mimo stats preview" className="max-w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
