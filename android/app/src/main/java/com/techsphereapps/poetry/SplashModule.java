package com.techsphereapps.poetry;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SplashModule extends ReactContextBaseJavaModule {
    private String module_name = "splash";

    private ReactContext saveApplicationContext;

    public SplashModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        saveApplicationContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return module_name;
    }

    @ReactMethod
    public void hide(){
        Splash.hide();

    }

    @ReactMethod
    public void show(){
        Splash.show(getCurrentActivity().getApplicationContext());
    }

}
