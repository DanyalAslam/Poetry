package com.techsphereapps.poetry.nativeModules.firebase.cloudmessaging;

import androidx.annotation.NonNull;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class NotificationService extends FirebaseMessagingService {
    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        if(remoteMessage.getNotification() != null){
            Helper.showNotification(this,remoteMessage.getNotification().getTitle(),remoteMessage.getNotification().getBody(),remoteMessage.getData());
        }
        if(remoteMessage.getData().size() > 0){
            if(Notifications.reactApplicationContext != null){
                Notifications.sendNotificationToJS(remoteMessage.getData());
            }
        }
    }
}
