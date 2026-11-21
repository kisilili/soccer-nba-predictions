export default async function SoccerPage() {
  const apiKey = process.env.ODDS_API_KEY;

  let matches: any[] = [];
  let errorMessage = "";

  if (!apiKey) {
    errorMessage = "API key is missing";
  } else {
    try {
      const res = await fetch(
        `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=uk&markets=h2h&oddsFormat=decimal
