import { useCallback, useEffect, useState } from 'react';
import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  AuthorizationStatus,
  TimestampTrigger,
  TriggerNotification,
  TriggerType,
} from '@notifee/react-native';
import { Platform } from 'react-native';
import moment from 'moment';

const useReminder = () => {
  const [channelId, setChannelID] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const id = await notifee.createChannel({
          id: 'default',
          name: 'defaultChannel',
          importance: AndroidImportance.HIGH,
        });
        setChannelID(id);
      } else {
        setChannelID('ios-fake-channel-id');
      }
    })();
  }, []);
  const [reminders, setReminders] = useState<TriggerNotification[]>([]);
  const loadReminders = useCallback(async () => {
    const notifications = await notifee.getTriggerNotifications();
    setReminders(notifications);
  }, []);
  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  const removeReminder = useCallback(
    async (id: string) => {
      await notifee.cancelTriggerNotification(id);
      await loadReminders();
    },
    [loadReminders],
  );

  const hasReminder = useCallback(
    (id: string) => {
      const reminder = reminders.find(r => r.notification.id === id);
      return reminder !== undefined;
    },
    [reminders],
  );
  const addReminder = useCallback(
    async (releaseDate: string, title: string, movieId: number) => {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
        throw new Error('Permission is denied');
      }

      if (Platform.OS === 'android') {
        if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
          throw new Error(
            'Please allow setting alarms and reminder on setting',
          );
        }
      }

      if (channelId == null) {
        throw new Error('Channel is not created');
      }

      // 개발 모드에서 오늘 날짜인 경우 테스트용으로 5초 후에 알림 설정
      let notificationTimestamp = moment(releaseDate).valueOf();
      if (__DEV__) {
        const releaseMoment = moment(releaseDate);
        const today = moment().startOf('day');
        const releaseDay = releaseMoment.startOf('day');

        // 오늘 날짜인 경우 5초 후로 설정
        if (releaseDay.isSame(today)) {
          notificationTimestamp = moment().add(5, 'seconds').valueOf();
        }
      }

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: notificationTimestamp,
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          id: `${movieId}`,
          title: '영화 개봉일 알림',
          body: title,
          android: {
            channelId: channelId,
          },
        },
        trigger,
      );
      await loadReminders();
    },
    [channelId, loadReminders],
  );

  return {
    addReminder,
    reminders,
    removeReminder,
    hasReminder,
  };
};

export default useReminder;
