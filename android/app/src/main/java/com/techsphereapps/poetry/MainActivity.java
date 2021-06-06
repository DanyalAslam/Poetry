package com.techsphereapps.poetry;

import android.content.Intent;
import android.content.IntentSender;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.tasks.Task;
import com.techsphereapps.poetry.nativeModules.firebase.cloudmessaging.Notifications;

public class MainActivity extends ReactActivity {

  private AppUpdateManager appUpdateManager;
  private static final int REQ_CODE_VERSION_UPDATE = 530;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    if (intent != null) {
      Bundle extras = intent.getExtras();
      if (extras != null) {
        Notifications.saveTapEvent(extras);
      }
    }
  }

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState) {

    Splash.show(this);

    super.onCreate(savedInstanceState);

    handleIntent(getIntent());
    
    checkForAppUpdate();

//    showReviewPopup();
  }

  private void showReviewPopup(){
    ReviewManager manager = ReviewManagerFactory.create(this);

    Task<ReviewInfo> request = manager.requestReviewFlow();
    request.addOnCompleteListener(task -> {
      if (task.isSuccessful()) {
        // We can get the ReviewInfo object
        ReviewInfo reviewInfo = task.getResult();

        Task<Void> flow = manager.launchReviewFlow(this, reviewInfo);
        flow.addOnCompleteListener(task2 -> {
          // The flow has finished. The API does not indicate whether the user
          // reviewed or not, or even whether the review dialog was shown. Thus, no
          // matter the result, we continue our app flow.
        });


      } else {
        // There was some problem, continue regardless of the result.
      }
    });


  }


  @Override
  protected void onResume() {
    super.onResume();
    checkNewAppVersionState();
  }

  private void checkForAppUpdate() {
    // Creates instance of the manager.
    appUpdateManager = AppUpdateManagerFactory.create(this);

    // Returns an intent object that you use to check for an update.
    Task<AppUpdateInfo> appUpdateInfoTask = appUpdateManager.getAppUpdateInfo();



    // Checks that the platform will allow the specified type of update.
    appUpdateInfoTask.addOnSuccessListener(appUpdateInfo -> {
      if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE) {

        Log.d("checkForAppUpdate", "checkForAppUpdate: "+appUpdateInfo.availableVersionCode()+" : ");



        if (appUpdateInfo.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE) ) {
          // Start an update.
          startAppUpdateImmediate(appUpdateInfo);
        }

      }else{
        Log.d("checkForAppUpdate", "checkForAppUpdate: else "+appUpdateInfo.availableVersionCode()+" : ");
      }
    });
  }


  private void startAppUpdateImmediate(AppUpdateInfo appUpdateInfo) {
    try {
      appUpdateManager.startUpdateFlowForResult(
              appUpdateInfo,
              AppUpdateType.IMMEDIATE,
              // The current activity making the update request.
              this,
              // Include a request code to later monitor this update request.
              MainActivity.REQ_CODE_VERSION_UPDATE);
    } catch (IntentSender.SendIntentException e) {
      e.printStackTrace();
    }
  }

  private void checkNewAppVersionState() {
    appUpdateManager
            .getAppUpdateInfo()
            .addOnSuccessListener(
                    appUpdateInfo -> {


                      //IMMEDIATE:
                      if (appUpdateInfo.updateAvailability()
                              == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS) {
                        // If an in-app update is already running, resume the update.
                        startAppUpdateImmediate(appUpdateInfo);
                      }
                    });

  }





  @Override
  protected String getMainComponentName() {
    return "poetry";
  }
}
