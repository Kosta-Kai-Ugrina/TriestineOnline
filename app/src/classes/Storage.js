import AsyncStorage from "@react-native-async-storage/async-storage";

const GAMES_PLAYED = "games played";
const GAMES_WON = "games won";

export const getGamesPlayed = async () => {
  let gamesPlayed = null;
  try {
    gamesPlayed = await AsyncStorage.getItem(GAMES_PLAYED);
  } catch (e) {
    console.log(
      "ERROR AsyncStorage - getGamesPlayed(): failed to get value",
      e
    );
  }
  return parseInt(gamesPlayed);
};

export const getGamesWon = async () => {
  let gamesWon = null;
  try {
    gamesWon = await AsyncStorage.getItem(GAMES_WON);
  } catch (e) {
    console.log("ERROR AsyncStorage - getGamesWon(): failed to get value", e);
  }
  return parseInt(gamesWon);
};

export const initStorage = async () => {
  let gamesPlayedValue = getGamesPlayed();
  let gamesWonValue = getGamesWon();
  try {
    if (gamesPlayedValue === null)
      await AsyncStorage.setItem(GAMES_PLAYED, "0");
    if (gamesWonValue === null) await AsyncStorage.setItem(GAMES_WON, "0");
  } catch (e) {
    console.log(
      "ERROR AsyncStorage - initStorage(): failed to initialize value",
      e
    );
  }
  return {
    gamesPlayed: parseInt(gamesPlayedValue),
    gamesWon: parseInt(gamesWonValue),
  };
};

export const incrementGamesPlayed = async () => {
  let gamesPlayed = getGamesPlayed();
  try {
    await AsyncStorage.setItem(GAMES_PLAYED, (gamesPlayed + 1).toString());
  } catch (e) {
    console.log(
      "ERROR AsyncStorage - incrementGamesPlayed: failed to save new value",
      e
    );
  }
};

export const incrementGamesWon = async () => {
  let gamesWon = getGamesWon();
  try {
    await AsyncStorage.setItem(GAMES_WON, (gamesWon + 1).toString());
  } catch (e) {
    console.log(
      "ERROR AsyncStorage - incrementGamesWon: failed to save new value",
      e
    );
  }
};
