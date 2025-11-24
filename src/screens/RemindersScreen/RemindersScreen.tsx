import React from 'react';
import Screen from '../../components/Screen';
import useReminder from '../../hooks/useReminder';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from 'open-color';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  renderList: { padding: 20 },
  reminderItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    borderColor: Colors.gray[6],
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: 'bold',
  },
  bodyText: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.white,
  },
  separator: { height: 8 },
  textContainer: { flex: 1 },
  removeReminderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const RemindersScreen = () => {
  const { reminders, removeReminder } = useReminder();

  return (
    <Screen>
      <FlatList
        contentContainerStyle={styles.renderList}
        data={reminders}
        renderItem={({ item: reminder }) => {
          return (
            <View style={styles.reminderItem}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {reminder.notification.body}
                </Text>
                {'timestamp' in reminder.trigger && (
                  <Text style={styles.titleText}>
                    {moment(reminder.trigger.timestamp).format('LLLL')}
                  </Text>
                )}
              </View>
              <View style={styles.removeReminderContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (reminder.notification.id !== undefined) {
                      removeReminder(reminder.notification.id);
                    }
                  }}>
                  <FontAwesomeIcon
                    icon={faBellSlash}
                    size={24}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Screen>
  );
};
export default RemindersScreen;
