export async function getLatestGames() {
  const LATEST_GAMES =
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

  const rawData = await fetch(LATEST_GAMES);
  const json = await rawData.json();

  const items = json?.data?.items || [];

  return items.map((item) => {
    const { slug, title, description, image, criticScoreSummary } = item;

    const score = criticScoreSummary?.score || null;
    const img = image ? `https://www.metacritic.com/a/img/${image.bucketType}${image.bucketPath}` : null;

    return {
      slug,
      title: title || "Título no disponible",
      description: description || "Descripción no disponible",
      score,
      img,
    };
  });
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  console.log('Respuesta de la API para el juego:', json); // Log para depurar

  // Manejo de errores
  if (!json?.components || json.components.length === 0) {
    throw new Error('No se encontraron detalles del juego');
  }

  // Acceso simplificado a los datos del juego
  const gameInfo = json.components[0]?.data[0]?.meta || {};

  return {
    img: gameInfo.image ? `https://www.metacritic.com/a/img/${gameInfo.image.bucketType}${gameInfo.image.bucketPath}` : null,
    title: gameInfo.title || "Título no disponible",
    description: gameInfo.description || "Descripción no disponible",
    score: gameInfo.score || null,
  };
}
