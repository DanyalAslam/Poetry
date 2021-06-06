import { NativeEventEmitter, NativeModules } from "react-native"
const notificationsReceivedEvent = "firebase_push_notification_received";
const notificationsTapEvent = "firebase_push_notification_tap";

var receivedEventSubscription = null;
var tapEventSubscription = null;

export const getModule = () => {
    const Notifications = NativeModules.Notifications
    if (Notifications) {
        return Notifications
    } else {
        return false;
    }
}
export const clearAllNotifications = () => {
    const module = getModule()
    if (module.clearAllNotifications) {
        module.clearAllNotifications()
    }
}

export const emitter = new NativeEventEmitter(getModule());

export const getToken = async () => {
    const module = getModule()
    if (module != false) {
        try {
            const token = await module.getToken();
            return Promise.resolve(token)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
export const startReceivingTaps = () => {
    const module = getModule()
    if (module.startReceivingTaps) {
        module.startReceivingTaps()
    }
}
export const removeNotificationTapListener = () => {
    if(tapEventSubscription){
        tapEventSubscription.remove();
    }

}
export const onNotificationTap = (callback) => {
    tapEventSubscription = emitter.addListener(notificationsTapEvent, data => {
        if (callback) {
            callback(data)
        }
    })

}
export const removeNotificationListener = () => {

    if(receivedEventSubscription){
        receivedEventSubscription.remove();
    }
}
export const onNotificationReceived = (callback) => {
    receivedEventSubscription =  emitter.addListener(notificationsReceivedEvent, data => {
        if (callback) {
            callback(data)
        }
    })
}