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
//        Feather.setScaleType(ImageView.ScaleType.);

        Poetry = new ImageView(applicationContext);
        Poetry.setImageDrawable(getDrawable(applicationContext,R.drawable.poetry));
        Poetry.setScaleType(ImageView.ScaleType.FIT_CENTER);



        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT,RelativeLayout.LayoutParams.MATCH_PARENT);

        dialog = new Dialog(applicationContext, android.R.style.Theme_DeviceDefault_Light_NoActionBar_Fullscreen);
        dialog.setCancelable(false);


        RelativeLayout relativeLayout = new RelativeLayout(applicationContext);

        relativeLayout.setBackgroundColor(Color.BLACK);

        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.addRule(RelativeLayout.CENTER_IN_PARENT);

        relativeLayout.addView(Feather, layoutParams);
        Feather.getLayoutParams().width = 30*vw;
        Feather.getLayoutParams().height = 40*vh;
        Feather.requestLayout();
        Feather.setVisibility(View.INVISIBLE);


        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.addRule(RelativeLayout.CENTER_HORIZONTAL);

        relativeLayout.addView(Book, layoutParams);
        Book.getLayoutParams().width = 90*vw;
        Book.getLayoutParams().height = 40*vh;
        Book.requestLayout();
        Book.setVisibility(View.INVISIBLE);
        Book.setY(55*vh);





//        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
//
//
//        relativeLayout.addView(leftArrow, layoutParams);
//        leftArrow.getLayoutParams().width = 8*vw;
//        leftArrow.getLayoutParams().height = 8*vh;
//        leftArrow.requestLayout();
//        leftArrow.setVisibility(View.INVISIBLE);
//        leftArrow.setY(51.5f*vh);
//        leftArrow.setX(22f*vw);
//
//
//
//
//        layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
//
//
//        relativeLayout.addView(rightArrow, layoutParams);
//        rightArrow.getLayoutParams().width = 8*vw;
//        rightArrow.getLayoutParams().height = 8*vh;
//        rightArrow.requestLayout();
//        rightArrow.setVisibility(View.INVISIBLE);
//        rightArrow.setY(51.5f*vh);
//        rightArrow.setX(70f*vw);





        dialog.setContentView(relativeLayout);

        dialog.show();

//        startAnimation(vw,vh);

        startFadeAnimation(Book, 2000, vw, "Book");

        Log.d("SPLASH SHOW ", "show:  hiii");
    }

    public static void startAnimation( float vw, float vh){


        TranslateAnimation translateAnimation = new TranslateAnimation(0,0,110*vh,0);

        translateAnimation.setDuration(2200);

//        Logo.startAnimation(translateAnimation);

        translateAnimation.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {
                Log.d("ANIMATION ", "onAnimationStart:  started");
            }


            @Override
            public void onAnimationEnd(Animation animation) {

                Log.d("ANIMATION ", "onAnimationEnd:  ended");

//                startFadeAnimation(title,"", 1800,vw);
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

                    startFadeAnimation(Feather,1500,vw,"");
                }
                else{

                }


            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

    }

    public static void startArrowAnimation( float vw){


//        Animator leftArrowAnimation = ObjectAnimator.ofFloat(leftArrow,View.TRANSLATION_X,-50*vw,22f*vw ).setDuration(2000);
//
//        leftArrow.setVisibility(View.VISIBLE);
//
//
//
//        Animator rightArrowAnimation = ObjectAnimator.ofFloat(rightArrow,View.TRANSLATION_X,155*vw,76f*vw ).setDuration(2000);
//
//        rightArrow.setVisibility(View.VISIBLE);
//
//
//
//        AnimatorSet animatorSet = new AnimatorSet();
//
//        animatorSet.play(leftArrowAnimation).with(rightArrowAnimation);
//
//        animatorSet.addListener(new AnimatorListenerAdapter() {
//            @Override
//            public void onAnimationEnd(Animator animation) {
//                super.onAnimationEnd(animation);
//
//                startFadeAnimation(trueWell,"trueWell", 1300,vw);
//            }
//        });
//
//        animatorSet.start();

    }


}




