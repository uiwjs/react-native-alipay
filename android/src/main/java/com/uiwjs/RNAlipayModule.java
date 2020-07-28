package com.uiwjs.alipay;

import com.alipay.sdk.app.AuthTask;
import com.alipay.sdk.app.PayTask;
import com.alipay.sdk.app.EnvUtils;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Promise;
// import com.facebook.react.bridge.Callback;

import java.util.Map;

public class RNAlipayModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNAlipayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNAlipay";
    }

    // @ReactMethod
    // public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
    //     // TODO: Implement some actually useful functionality
    //     callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    // }

    @ReactMethod
    public void authInfo(final String infoStr, final Promise promise) {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                AuthTask authTask = new AuthTask(getCurrentActivity());
                Map<String, String> map = authTask.authV2(infoStr, true);
                promise.resolve(getWritableMap(map));
            }
        };
        Thread thread = new Thread(runnable);
        thread.start();
    }

    @ReactMethod
    public void setAlipaySandbox(Boolean isSandbox) {
        if (isSandbox) {
            EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
        } else {
            EnvUtils.setEnv(EnvUtils.EnvEnum.ONLINE);
        }
    }
    @ReactMethod
    public void alipay(final String orderInfo, final Promise promise) {
        Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
                PayTask alipay = new PayTask(getCurrentActivity());
                Map<String, String> result = alipay.payV2(orderInfo, true);
                promise.resolve(getWritableMap(result));
            }
        };
        // 必须异步调用
        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    @ReactMethod
    public void getVersion(Promise promise) {
        PayTask payTask = new PayTask(getCurrentActivity());
        promise.resolve(payTask.getVersion());
    }

    private WritableMap getWritableMap(Map<String, String> map) {
        WritableMap writableMap = Arguments.createMap();
        for (Map.Entry<String, String> entry : map.entrySet()) {
            writableMap.putString(entry.getKey(), entry.getValue());
        }
        return writableMap;
    }
}
