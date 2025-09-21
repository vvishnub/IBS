import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { profileData } from "@/constants/dummyData";
import { Colors, Fonts } from "@/constants/theme";
import { ListRenderItemInfo } from "react-native";
import { styles } from "./profileStyles";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
      headerImage={
        <IconSymbol
          size={120}
          color={Colors.light.primary}
          name="person.fill"
          style={styles.headerImage}
        />
      }
      data={[]}
      renderItem={function (
        info: ListRenderItemInfo<unknown>
      ): React.ReactElement | null {
        throw new Error("Function not implemented.");
      }}
    >
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            alignSelf:'center'
          }}
        >
          {profileData?.fullName}
        </ThemedText>
    </ParallaxScrollView>
  );
}
