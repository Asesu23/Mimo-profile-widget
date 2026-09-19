'use client';

import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_THEME_ID, THEMES } from '@entities/widget-theme';
import { ALL_STATS, type StatKey } from '@entities/widget-stat';
import { useConnectAccount } from '@features/connect-account';
import { disconnectAccount } from '@features/disconnect-account';
import { toggleStatKey } from '@features/toggle-stat';
import { LocaleSwitch } from '@features/switch-locale';
import { useTranslation } from '@shared/lib/i18n';
import { ConnectForm } from '@widgets/connect-form';
import { WidgetPreview } from '@widgets/widget-preview';
import { WidgetLinks } from '@widgets/widget-links';

function buildWidgetUrl(origin: string, widgetId: string, themeId: string, stats: StatKey[]) {
  const params = new URLSearchParams();
  if (themeId !== DEFAULT_THEME_ID) params.set('theme', themeId);
  if (stats.length !== ALL_STATS.length) params.set('stats', stats.join(','));
  const query = params.toString();
  return `${origin}/api/widget/${widgetId}${query ? `?${query}` : ''}`;
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

function Header({ align }: { align: 'left' | 'center' }) {
  const { t } = useTranslation();
  const isCenter = align === 'center';

  return (
    <header className={`flex flex-col gap-2 ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
      <p className="text-base text-neutral-500">{t('subtitle')}</p>
    </header>
  );
}

export function WidgetGeneratorPage() {
  const { locale, setLocale, t } = useTranslation();
  const { email, setEmail, password, setPassword, status, widgetId, errorMessage, connect, reset } =
    useConnectAccount();

  const [themeId, setThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [visibleStats, setVisibleStats] = useState<StatKey[]>(ALL_STATS);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState({ loaded: 0, total: 0 });

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    if (status !== 'connected' || !widgetId || !origin) return;

    let cancelled = false;
    const urls = Object.keys(THEMES).map((theme) => buildWidgetUrl(origin, widgetId, theme, ALL_STATS));

    setIsPreloading(true);
    setPreloadProgress({ loaded: 0, total: urls.length });

    Promise.all(
      urls.map((url) =>
        preloadImage(url).then(() => {
          if (!cancelled) setPreloadProgress((prev) => ({ ...prev, loaded: prev.loaded + 1 }));
        }),
      ),
    ).then(() => {
      if (!cancelled) setIsPreloading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [status, widgetId, origin]);

  const imageUrl = useMemo(() => {
    if (!widgetId) return '';
    return buildWidgetUrl(origin, widgetId, themeId, visibleStats);
  }, [widgetId, themeId, visibleStats, origin]);

  const markdown = widgetId ? `[![Mimo Stats](${imageUrl})](https://mimo.org)` : '';

  async function handleDisconnect() {
    if (!widgetId) return;
    await disconnectAccount(widgetId);
    reset();
  }

  function toggleStat(key: StatKey) {
    setVisibleStats((current) => toggleStatKey(current, key));
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-surface px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #D946EF, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-10 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #D946EF, transparent 70%)' }}
      />

      <div className="absolute right-6 top-6 z-10 sm:right-10 lg:right-16">
        <LocaleSwitch locale={locale} onToggle={() => setLocale(locale === 'en' ? 'ru' : 'en')} />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-10">
        {status === 'connected' && widgetId ? (
          isPreloading ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-accent" />
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-white">{t('preloadingTitle')}</p>
                <p className="text-sm text-neutral-500">{t('preloadingSubtitle')}</p>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-200"
                    style={{
                      width: `${preloadProgress.total > 0 ? Math.round((preloadProgress.loaded / preloadProgress.total) * 100) : 0}%`,
                    }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs text-neutral-500">
                  {preloadProgress.loaded} / {preloadProgress.total}
                </p>
              </div>
            </div>
          ) : (
            <>
              <Header align="left" />
              <section className="flex flex-col gap-10">
                <WidgetPreview
                  themeId={themeId}
                  onThemeChange={setThemeId}
                  visibleStats={visibleStats}
                  onToggleStat={toggleStat}
                  imageUrl={imageUrl}
                  t={t}
                />
                <WidgetLinks imageUrl={imageUrl} markdown={markdown} onDisconnect={handleDisconnect} t={t} />
              </section>
            </>
          )
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <Header align="center" />
            <div className="w-full max-w-lg">
              <ConnectForm
                email={email}
                password={password}
                status={status}
                errorMessage={errorMessage}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={connect}
                t={t}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
