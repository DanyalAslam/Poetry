package com.techsphereapps.poetry;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.TranslateAnimation;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import static androidx.core.content.ContextCompat.getDrawable;

public class Splash {

    private static Dialog dialog;

    private static ImageView Logo;

    private static boolean shouldHide = false;


    public static void hide() {
        if(shouldHide){
            dialog.dismiss();
        }
    }

    public static void show(Context applicationContext) {
        DisplayMetrics displayMetrics = new DisplayMetrics();
        ((Activity) applicationContext).getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        int vh = displayMetrics.heightPixels / 100;
        int vw = displayMetrics.widthPixels / 100;



        Logo = new ImageView(applicationContext);
        Logo.setImageDrawable(getDrawable(applicationContext,R.drawable.logo));
        Logo.setScaleType(ImageView.ScaleType.FIT_XY);




        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT,RelativeLayout.LayoutParams.MATCH_PARENT);

        dialog = new Dialog(applicationContext, android.R.style.Theme_DeviceDefault_Light_NoActionBar_Fullscreen);
        dialog.setCancelable(false);


        RelativeLayout relativeLayout = new RelativeLayout(applicationContext);

        relativeLayout.setBackgroundColor(Color.BLACK);

        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.addRule(RelativeLayout.CENTER_IN_PARENT);

        relativeLayout.addView(Logo, layoutParams);
        Logo.getLayoutParams().width = 45*vw;
        Logo.getLayoutParams().height = 25*vh;
        Logo.requestLayout();
        Logo.setVisibility(View.INVISIBLE);



        dialog.setContentView(relativeLayout);

        dialog.show();


        startFadeAnimation(Logo, 2500);

        Log.d("SPLASH SHOW ", "show:  hiii");
    }


    public static void startFadeAnimation (ImageView imageView, int duration) {

        AlphaAnimation alphaAnimation = new AlphaAnimation(0f,1f);

        imageView.setVisibility(View.VISIBLE);

        alphaAnimation.setDuration(duration);

        imageView.startAnimation(alphaAnimation);

        alphaAnimation.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {
                Log.d("ANIMATION ", "onAnimationStart:  started");
            }


            @Override
            public void onAnimationEnd(Animation animation) {

                Log.d("ANIMATION ", "onAnimationEnd:  ended");

                shouldHide = true;
                hide();


            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

    }



}




