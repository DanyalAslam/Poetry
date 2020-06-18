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

    private static ImageView Book, Feather, Poetry;

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


        Book = new ImageView(applicationContext);
        Book.setImageDrawable(getDrawable(applicationContext,R.drawable.book));
        Book.setScaleType(ImageView.ScaleType.FIT_CENTER);

        Feather = new ImageView(applicationContext);
        Feather.setImageDrawable(getDrawable(applicationContext,R.drawable.leaf));
        Feather.setScaleType(ImageView.ScaleType.FIT_XY);

        Poetry = new ImageView(applicationContext);
        Poetry.setImageDrawable(getDrawable(applicationContext,R.drawable.poetry));
        Poetry.setScaleType(ImageView.ScaleType.FIT_XY);



        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT,RelativeLayout.LayoutParams.MATCH_PARENT);

        dialog = new Dialog(applicationContext, android.R.style.Theme_DeviceDefault_Light_NoActionBar_Fullscreen);
        dialog.setCancelable(false);


        RelativeLayout relativeLayout = new RelativeLayout(applicationContext);

        relativeLayout.setBackgroundColor(Color.BLACK);

        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.addRule(RelativeLayout.CENTER_IN_PARENT);

        relativeLayout.addView(Feather, layoutParams);
        Feather.getLayoutParams().width = 55*vw;
        Feather.getLayoutParams().height = 35*vh;
        Feather.requestLayout();
        Feather.setVisibility(View.INVISIBLE);


        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.addRule(RelativeLayout.CENTER_HORIZONTAL);

        relativeLayout.addView(Book, layoutParams);
        Book.getLayoutParams().width = 90*vw;
        Book.getLayoutParams().height = 40*vh;
        Book.requestLayout();
        Book.setVisibility(View.INVISIBLE);
        Book.setY(30*vh);





        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);


        relativeLayout.addView(Poetry, layoutParams);
        Poetry.getLayoutParams().width = 85*vw;
        Poetry.getLayoutParams().height = 40*vh;
        Poetry.requestLayout();
        Poetry.setVisibility(View.INVISIBLE);
        Poetry.setY(31f*vh);
        Poetry.setX(15f*vw);





        dialog.setContentView(relativeLayout);

        dialog.show();


        startFadeAnimation(Book, 2000, vw, "Book");

        Log.d("SPLASH SHOW ", "show:  hiii");
    }

    public static void startAnimation( float vw){


        TranslateAnimation translateAnimation = new TranslateAnimation(60*vw,0*vw,0,0);

        translateAnimation.setDuration(2200);

        Poetry.setVisibility(View.VISIBLE);

        Poetry.startAnimation(translateAnimation);

        translateAnimation.setAnimationListener(new Animation.AnimationListener() {
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

    public static void startFadeAnimation (ImageView imageView, int duration, float vw, String key) {

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

                if( key == "Book"){

                    startFadeAnimation(Feather,2000,vw,"");
                }
                else{

                    startAnimation(vw);
                }


            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

    }



}




