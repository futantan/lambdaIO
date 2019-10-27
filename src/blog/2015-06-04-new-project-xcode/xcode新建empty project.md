---
title: Xcode新建Empty Application
date: 2015-06-04 11:01:51
tags: ['iOS']
path: new-project-xcode
---

Create a new `empty` application in `XCode 6`

<!--more-->

1. Create a new project
2. Select the "Single View Application" template
3. Delete the the files Main.storyboard, ViewController.h, ViewController.m
4. Go into your project settings (Command+1, then click on the project name at the top), and delete the text "Main" under "Main Interface"
5. Open AppDelegate.m and add in the missing window code. Your application:didFinishLaunchingWithOptions: method should look like:

---

```c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
  // Override point for customization after application launch.
  self.window.backgroundColor = [UIColor whiteColor];
  [self.window makeKeyAndVisible];
  return YES;
}
```

for swift:

```swift
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
  self.window = UIWindow(frame: UIScreen.mainScreen().bounds)
  self.window?.backgroundColor = UIColor.whiteColor()
  self.window?.makeKeyAndVisible()
  return true
}
```
