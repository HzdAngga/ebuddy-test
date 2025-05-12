function normalize(value: number, max: number) {
  return max > 0 ? value / max : 0;
}
function normalizeRecentlyActive(timestamp: number) {
  const decayRate = 0.000000000000001;
  const now = Date.now();
  const diff = now - timestamp;
  return Math.exp(-decayRate * diff);
}

export function calculateRankingUser({
  totalAverageWeightRatings,
  numberOfRents,
  recentlyActive,
  highestRents,
}: {
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: string;
  highestRents: number;
}) {
  const recentlyActiveUnix = new Date(recentlyActive).getTime();
  const ratingScore = normalize(totalAverageWeightRatings, 5); // assumption: max rating = 5
  const rentsScore = normalize(numberOfRents, highestRents); // highestRents in users db
  const recentlyActiveScore = normalizeRecentlyActive(recentlyActiveUnix);
  const rankingScore = String(
    ratingScore * 0.6 + rentsScore * 0.2 + recentlyActiveScore * 0.1,
  );
  return rankingScore;
}
