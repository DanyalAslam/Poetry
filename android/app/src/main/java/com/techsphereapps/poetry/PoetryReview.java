package com.techsphereapps.poetry;

import android.app.Activity;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.tasks.Task;

import com.facebook.react.bridge.Callback;

public class PoetryReview {

    public static void showReviewPopup(ReactApplicationContext context, Callback successCB, Callback errorCB){
        ReviewManager manager = ReviewManagerFactory.create(context);

        Task<ReviewInfo> request = manager.requestReviewFlow();
        request.addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                // We can get the ReviewInfo object
                ReviewInfo reviewInfo = task.getResult();

                Task<Void> flow = manager.launchReviewFlow(context.getCurrentActivity(), reviewInfo);
                flow.addOnCompleteListener(task2 -> {


                    successCB.invoke("Review successfull");
                    // The flow has finished. The API does not indicate whether the user
                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                    // matter the result, we continue our app flow.
                });


            } else {

                errorCB.invoke("Review un successfull");
                // There was some problem, continue regardless of the result.
            }
        });


    }


}
