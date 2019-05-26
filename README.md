## 依赖安装（均已配置）
### 安装 react-navigation
```bash
npm install --save react-navigation
npm install --save react-native-gesture-handler
react-native link react-native-gesture-handler
```

为了完成 react-native-gesture-handler 在 Android 上的安装，请确保在 MainActivity.java 上完成如下修改。
```java
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

### 下载图标库
```bash
npm install react-native-vector-icons
```
配置见 [GitHub](https://github.com/oblador/react-native-vector-icons#android) 。

### 下载 Swipeout
```bash
npm install --save react-native-swipeout
```

下载react camera
根据官网配置camera