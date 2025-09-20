import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { profileData } from "@/constants/dummyData";
import { Colors, Fonts } from "@/constants/theme";
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
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          {profileData?.fullName}
        </ThemedText>
      </ThemedView>
      <ThemedText>{profileData?.bio}</ThemedText>
    </ParallaxScrollView>
  );
}
