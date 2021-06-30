import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState } from 'react';

const ReadMore = ({text, maxLength=20}) => {
  const [expand, setExpand] = useState(false);
  console.log("🚀 ~ ReadMore ~ expand", expand);
  const toggleExpand = () => {
    setExpand(!expand);
  };
  if (text.length > maxLength) {
    return (
      <>
        <Text>{expand ? text : text.slice(0, maxLength)}</Text>
        {expand ? (
          <Text fontWeight="600" onPress={toggleExpand}>
            Show less
          </Text>
        ) : (
          <Text fontWeight="600" onPress={toggleExpand}>
            Show more
          </Text>
        )}
      </>
    );
  }
  return <Text>{text}</Text>;
};

const Page = ({ backgroundColor, iconName, title }) => {
  return (
    title==="Read about the game here" ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor
      }}
    >
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          Read about the game here
        </Text>
          <ReadMore text="Primary functionalities: 1)Join game: Joining games is done via clicking on the “Play” button in the home screen. Without any added secondary functionality, the server in the background is supposed to automatically connect the player to a “game room”, which is an online session of 4 players playing the card game together. The server will determine whether a new game room needs to be created, or if an existing game room exists.  2) Play game : The party consists of multiple rounds, at the beginning of which each player is dealt 10 cards, and at the end of which points are added to the total score of the teams. Rounds consist of 10 turns1, in which each player plays one card. The party ends (and with it, the game) once one teams achieves 41 points or more. 3) He has 10 cards dealt to him and, when it’s his turn, he can play a card (if the card played is legal). Special markers can display which cards are legal to play and which are not. Besides playing a card, a player can also click two buttons if he’s the first to play a card: knock (“Play a strong card”) and swipe table(“This is my last card in this suit”). The button will not be displayed/will be disabled if he is not allowed to use them at any one moment during the game. The player can see the following on-screen during the game:  1) Which cards had been played in the current turn 2) His hand (what cards he has left) 3) The scoreboard, or an arrow on the edge of the screen that, when pulled, allows the player to see the current score. 4) The “knock” and “swipe table” buttons (if legal to use) 5) If another player clicks the “knock” and “swipe table” buttons, the player gets a audio-visual indicator that the other player has done so. A player can see his personal statistics, for example, how many he has won and lost and a win/loss ratio, in the home screen or in a special screen for personal statistics (TBD). " maxLength={0}></ReadMore>
      </View>
      <MaterialCommunityIcons name={iconName} size={100} color="white" />
    </View>
  ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor
        }}
      >
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            {title}
          </Text>
        </View>
        <MaterialCommunityIcons name={iconName} size={100} color="white" />
      </View>
  )
  )};

export default Page;
