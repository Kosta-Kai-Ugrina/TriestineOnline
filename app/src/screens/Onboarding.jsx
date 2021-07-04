import React, { useRef } from "react";
import { View, Text } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { useNavigation } from "@react-navigation/native";
import Page from "../components/Page";
import Footer from "../components/Footer";

const Onboarding = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor="#ffc93c"
            iconName="cards"
            title="Welcome to Triestine Online"
          />
          <Footer
            backgroundColor="#ffc93c"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor="#B22222"
            iconName="lightbulb-on-outline"
            title="Read about the game here"
          />
          <Footer
            backgroundColor="#B22222"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(0);
            }}
            rightButtonLabel="Continue"
            rightButtonPress={() => {
              navigation.navigate("Main");
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};

export default Onboarding;
