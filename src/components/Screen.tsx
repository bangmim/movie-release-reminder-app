import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';
interface ScreenProp {
  children?: React.ReactNode;
  title?: string;
  headerVisible?: boolean;
  renderRightComponent?: () => JSX.Element;
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black },
  header: { height: 48, flexDirection: 'row' },
  left: { flex: 1, justifyContent: 'center' },
  backIcon: { color: Colors.white, marginLeft: 20 },
  center: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.white },
  right: { flex: 1 },
  content: { flex: 1 },
});
const Screen = ({
  children,
  title,
  headerVisible = true,
  renderRightComponent,
}: ScreenProp) => {
  const colorScheme = useColorScheme();
  const { canGoBack, goBack } = useNavigation();
  const onPressBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="light-content" />
      ) : colorScheme == 'dark' ? (
        <StatusBar barStyle="dark-content" />
      ) : (
        <StatusBar barStyle="light-content" />
      )}
      {headerVisible && (
        <View style={styles.header}>
          <View style={styles.left}>
            {canGoBack() && (
              <TouchableOpacity onPress={onPressBackButton}>
                <FontAwesomeIcon
                  style={styles.backIcon}
                  size={20}
                  icon={faArrowLeft}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.center}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <View style={styles.right}>
            {renderRightComponent !== undefined && renderRightComponent()}
          </View>
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
