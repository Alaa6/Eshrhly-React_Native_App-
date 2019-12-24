package com.org.newConcept.eshrh_ley;

import com.facebook.react.modules.i18nmanager.I18nUtil;

import com.reactnativenavigation.NavigationActivity;
import org.devio.rn.splashscreen.SplashScreen;

import androidx.annotation.Nullable;

import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends NavigationActivity {


 @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

}
