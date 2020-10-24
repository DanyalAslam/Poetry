package com.techsphereapps.poetry;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PoetryReviewModule extends ReactContextBaseJavaModule {

    private String module_name = "PoetryReview";

    private ReactApplicationContext saveApplicationContext;

    public PoetryReviewModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        saveApplicationContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return module_name;
    }

    @ReactMethod
    public void showReviewPopUp(Callback successCB, Callback errorCB){

        PoetryReview.showReviewPopup(saveApplicationContext,successCB,errorCB);

    }


}
