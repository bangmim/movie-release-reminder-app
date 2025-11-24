import { useCallback, useMemo, useState } from 'react';
import {
  Image,
  ImageStyle,
  LayoutChangeEvent,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from 'open-color';
interface YouTubeVideoProps {
  title: string;
  youTubeKey: string;
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  titleText: {
    padding: 12,
    color: Colors.black,
    fontSize: 16,
  },
});
const YouTubeVideo = ({ title, youTubeKey }: YouTubeVideoProps) => {
  const thumbnailImageUrl = `https://img.youtube.com/vi/${youTubeKey}/0.jpg`;
  const [imageHeight, setImageHeight] = useState(0);
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setImageHeight(width * (9 / 16));
  }, []);
  const thumbnailStyle = useMemo<ImageStyle>(
    () => ({ height: imageHeight }),
    [imageHeight],
  );
  const onPress = useCallback(() => {
    const url = `https://www.youtube.com/watch?v=${youTubeKey}`;
    Linking.openURL(url);
  }, [youTubeKey]);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLayout={onLayout}>
      <Image style={thumbnailStyle} source={{ uri: thumbnailImageUrl }} />
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default YouTubeVideo;
