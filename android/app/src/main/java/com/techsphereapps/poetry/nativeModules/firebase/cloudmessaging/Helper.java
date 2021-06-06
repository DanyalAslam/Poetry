package com.techsphereapps.poetry.nativeModules.firebase.cloudmessaging;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.techsphereapps.poetry.MainActivity;
import com.techsphereapps.poetry.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class Helper {
    public static String channel_name = "poetry_general_channel";
    public static String channel_description = "Default channel for app notifications";
    public static int request_code = 3230;
    public static int notification_id = 0;
    public static WritableMap mapToWritableMap(Map<String,String> data){
        WritableMap map = Arguments.createMap();
        for (Map.Entry<String, String> entry : data.entrySet()) {
            map.putString(entry.getKey(), entry.getValue());
        }
        return map;
    }
    public static WritableMap extrasToJSMap(Bundle extras){
        WritableMap map = Arguments.createMap();
        Set<String> ks = extras.keySet();
        Iterator<String> iterator = ks.iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Log.d("IIIIIIIIIII",key);
            Object value = extras.get(key);
            if (value instanceof String) {
                map.putString(key,(String) value);
            }
            else if(value instanceof Double){
                map.putDouble(key,(Double) value);
            }else if(value instanceof Float){
                map.putDouble(key,(Float) value);
            }else if(value instanceof Integer){
                map.putInt(key,(Integer) value);
            }else if(value instanceof  Boolean){
                map.putBoolean(key,(Boolean) value);
            }else if(value instanceof Map){
                map.putMap(key, (ReadableMap) value);
            }else if(value instanceof ArrayList){
                map.putArray(key, (ReadableArray) value);
            }
        }
        return map;
    }
    public static Map<String, String> bundleToMap(Bundle extras){
        Map<String, String> map = new HashMap<String, String>();
        Set<String> ks = extras.keySet();
        Iterator<String> iterator = ks.iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            map.put(key, extras.getString(key));
        }
        return map;
    }
    public static Bundle mapToBundle(Map<String, String> map){
        Bundle bundle = new Bundle();
        Iterator iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry pair = (Map.Entry) iterator.next();
            Object value = pair.getValue();
            if (value instanceof String) {
                String rawValue = (String) value;
                String rawKey = (String) pair.getKey();
                bundle.putString(rawKey,rawValue);
            }
            iterator.remove();
        }
        return bundle;
    }
    public static void showNotification(Context c, String title, String body, Map data) {
        Intent intent = new Intent(Notifications.reactApplicationContext, MainActivity.class);
        intent.putExtra("requestCode", request_code);
        intent.putExtras(mapToBundle(data));
        int color = Notifications.reactApplicationContext.getResources().getColor(R.color.notification);
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(c, request_code, intent, PendingIntent.FLAG_ONE_SHOT);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(Notifications.reactApplicationContext.getCurrentActivity(), channel_name)
                .setSmallIcon(R.drawable.notifications)
                .setContentTitle(title)
                .setContentText(body)
                .setColor(color)
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText(body))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);
//        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(Notifications.reactApplicationContext);
//        notificationManager.notify(notification_id, builder.build());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        {
            NotificationManager mManager = (NotificationManager) Notifications.reactApplicationContext.getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationChannel channel = new NotificationChannel(channel_name,Notifications.reactApplicationContext.getPackageManager().getApplicationLabel(Notifications.reactApplicationContext.getApplicationInfo()),NotificationManager.IMPORTANCE_MAX);
            mManager.createNotificationChannel(channel);
            mManager.notify(0,builder.build());
        }
        notification_id++;
    }
}

