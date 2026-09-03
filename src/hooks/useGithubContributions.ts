import { useState, useEffect, useMemo } from 'react';

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export interface ContributionStats {
  totalContributions: number;
  maxDay: { date: string; count: number } | null;
  activeDaysCount: number;
  averagePerActiveDay: number;
  availableYears: string[];
}

const CACHE_PREFIX = 'gh_contrib_';
const CACHE_TTL_MS = 30 * 60 * 1000;

export const useGithubContributions = (username: string) => {
  const [selectedYear, setSelectedYear] = useState<string>('lastYear');
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContributions = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = `${CACHE_PREFIX}${username}_${selectedYear}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            if (isMounted) {
              setData(parsed.payload);
              setLoading(false);
            }
            return;
          }
        } catch {
          // ignore corrupted cache and re-fetch
        }
      }

      try {
        const queryParam = selectedYear === 'lastYear' ? '?y=last' : `?y=${selectedYear}`;
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}${queryParam}`);

        if (!response.ok) {
          throw new Error(`github api returned status ${response.status}`);
        }

        const json: ContributionResponse = await response.json();

        if (isMounted) {
          setData(json);
          setLoading(false);

          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({
                timestamp: Date.now(),
                payload: json
              })
            );
          } catch {
            // handle quota exceeded gracefully
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'failed to fetch contribution data');
          setLoading(false);
        }
      }
    };

    fetchContributions();

    return () => {
      isMounted = false;
    };
  }, [username, selectedYear]);

  const stats: ContributionStats = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return {
        totalContributions: 0,
        maxDay: null,
        activeDaysCount: 0,
        averagePerActiveDay: 0,
        availableYears: ['lastYear', '2026', '2025', '2024', '2023']
      };
    }

    const availableYears = data.total
      ? ['lastYear', ...Object.keys(data.total).filter((y) => y !== 'lastYear').sort((a, b) => Number(b) - Number(a))]
      : ['lastYear', '2026', '2025', '2024', '2023'];

    const totalContributions =
      data.total && data.total[selectedYear] !== undefined
        ? data.total[selectedYear]
        : data.contributions.reduce((acc, curr) => acc + curr.count, 0);

    let maxDay: { date: string; count: number } | null = null;
    let activeDaysCount = 0;

    data.contributions.forEach((day) => {
      if (day.count > 0) {
        activeDaysCount++;
        if (!maxDay || day.count > maxDay.count) {
          maxDay = { date: day.date, count: day.count };
        }
      }
    });

    const averagePerActiveDay = activeDaysCount > 0 ? Number((totalContributions / activeDaysCount).toFixed(1)) : 0;

    return {
      totalContributions,
      maxDay,
      activeDaysCount,
      averagePerActiveDay,
      availableYears
    };
  }, [data, selectedYear]);

  return {
    data,
    loading,
    error,
    selectedYear,
    setSelectedYear,
    stats
  };
};
