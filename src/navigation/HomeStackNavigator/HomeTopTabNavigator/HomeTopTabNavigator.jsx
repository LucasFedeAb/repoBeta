import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CategoryTopTab } from "../../../screens/Home/components";
import styles from "./HomeTopTabNavigator.style";
/* import dataCategories from "../../../data/dataCategories"; */
import { useSelector } from "react-redux";
import { colorGreen } from "../../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
/* import { useGetCategoriesQuery } from "../../../services/gifsApi"; */

const TopTab = createMaterialTopTabNavigator();

const HomeTopTabNavigator = ({ uniqueCategories }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const categories = useSelector((state) => state.gifs.uniqueCategories);

  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: [
          styles.tabLabel,
          {
            color: "#fff",
          },
        ],
        tabBarItemStyle: [
          styles.tabBarItem,
          { borderColor: currentTheme.secondary },
        ],

        tabBarContentContainerStyle: [
          styles.tabBarContentContainer,
          {
            backgroundColor: "#000",
            /* backgroundColor: '#202124', */
          },
        ],
        tabBarIndicatorStyle: {
          backgroundColor: colorGreen.secondary,
        },
      }}
    >
      {categories.map((category) => (
        <TopTab.Screen
          name={category}
          component={CategoryTopTab}
          initialParams={{ category }}
          key={category}
        />
      ))}
    </TopTab.Navigator>
  );
};

export default HomeTopTabNavigator;
