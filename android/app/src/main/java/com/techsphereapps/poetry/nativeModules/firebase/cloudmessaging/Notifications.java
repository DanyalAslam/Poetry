package com.techsphereapps.poetry.nativeModules.firebase.cloudmessaging;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

import java.util.Map;

public class Notifications extends ReactContextBaseJavaModule {
    public static String TYPE_PAYMENT = "payment";
    public static String notificationsReceivedEvent = "firebase_push_notification_received";
    public static String notificationsTapEvent = "firebase_push_notification_tap";
    public static ReactApplicationContext reactApplicationContext;
    public static Bundle pendingTapEvent = null;
    public static Boolean shouldSendTaps = false;

    public Notifications(ReactApplicationContext context) {
        super(context);
        reactApplicationContext = context;
        this.createChannel();
    }
    public static void saveTapEvent(Bundle extras){
        if(shouldSendTaps == true){
            sendTapEventToJS(extras);
        }else{
            pendingTapEvent = extras;
        }
    }
    @ReactMethod
    public void clearAllNotifications(){
        NotificationManager mManager = (NotificationManager) reactApplicationContext.getSystemService(Context.NOTIFICATION_SERVICE);
        mManager.cancelAll();
    }
    @ReactMethod
    public void startReceivingTaps(){
        shouldSendTaps = true;
        if(pendingTapEvent != null){
            sendTapEventToJS(pendingTapEvent);
        }
    }
    public static void sendTapEventToJS(Bundle extras){
        WritableMap map = Helper.extrasToJSMap(extras);
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(notificationsTapEvent, map);
        pendingTapEvent = null;
    }
    public static void sendNotificationToJS(Map<String,String> data){
        WritableMap map = Helper.mapToWritableMap(data);
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(notificationsReceivedEvent, map);
    }
    public void createChannel() {
        CharSequence name = Helper.channel_name;
        String description = Helper.channel_description;
        int importance = NotificationManager.IMPORTANCE_HIGH;
        NotificationChannel channel = new NotificationChannel(Helper.channel_name, name, importance);
        channel.setDescription(description);
        NotificationManager notificationManager = reactApplicationContext.getSystemService(NotificationManager.class);
        notificationManager.createNotificationChannel(channel);
    }
    public static String moduleName = "Notifications";
    @ReactMethod
    public void getToken(Promise promise) {
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(new OnCompleteListener<String>() {
                    @Override
                    public void onComplete(@NonNull Task<String> task) {
                        if (!task.isSuccessful()) {
                            promise.reject(task.getException());
                            return;
                        }
                        String token = task.getResult();
                        promise.resolve(token);
                    }
                });
    }

    @NonNull
    @Override
    public String getName() {
        return moduleName;
    }
}

