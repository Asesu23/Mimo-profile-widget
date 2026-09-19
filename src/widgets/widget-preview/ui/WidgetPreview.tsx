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
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-60">
        <ThemePicker themeId={themeId} onChange={onThemeChange} t={t} />

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-neutral-500">{t('statsToShow')}</span>
          <StatsToggle visibleStats={visibleStats} onToggle={onToggleStat} t={t} />
        </div>
      </aside>

      <div className="flex flex-1 items-center justify-center rounded-3xl border border-surface-border bg-surface-card/40 px-6 py-10 lg:px-10 lg:py-14">
        <img src={imageUrl} alt="Mimo stats preview" className="w-full max-w-2xl rounded-2xl" />
      </div>
    </div>
  );
}
