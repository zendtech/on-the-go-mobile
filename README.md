Zend On The Go Mobile
=====================
Zend On The Go is a sample mobile application designed to show developers how to create mobile applications on top of existing PHP back-ends. The application uses HTML5/CSS/JS on the client side and Zend Framework + Apigility with Zend Server on the back-end. The application itself monitors your application and gives you live statistics on your server performance.

This repository contains the source code of the mobile part of the application. The source code of the server-side API part of the application is available in the [zendtech/on-the-go-api](https://github.com/zendtech/on-the-go-api) repository.

Importing the project in Zend Studio
------------------------------------

1. Switch to the Git perspective.
2. Click 'Clone a Git repository' toolbar button in the Git Repositories view to launch the Clone Git Repository wizard.
3. Paste the Git repository URL in the URI field: https://github.com/zendtech/on-the-go-mobile.git (this URL will be different if you have forked the repository)
4. All other fields will be automatically filled. Click the Next button.
5. If asked, accept RSA key fingerprint from _github.com_.
6. Don't change anything on the Branch Selection, just click the Next button.
7. Optionally, change the location in the Directory field where the repository will be cloned.
8. Select the 'Import all existing projects after clone finishes' checkbox.
9. Click Finish to clone the repository.
10. Switch back to the PHP perspective, you will find the on-the-go-mobile project in the PHP Explorer view.

Running the application
-----------------------
The easiest way to run the mobile application from Zend Studio is by using the CordovaSim emulator. It's a light-weight and fast web-based emulator that allows testing of Cordova-based mobile applications.

1. Right-click on the mobile project in the PHP Explorer view.
2. Select Run As > Run with CordovaSim from the context menu.

You can also use the other available options for launching the application: the emulators of the Android, iOS and Windows Phone platforms. They required additional installation and configuration of the respective platform SDK.

Debugging the application
-------------------------

1. Install the Google Chrome web browser, if you haven't yet.
2. Run the mobile app with CordovaSim. See the previous section for details.
2. Right-click on the device frame of the emulator and select Debug > Dev Tools... from the context menu.
3. Click on the hyprelink in the Dev Tools popup dialog. This will open the mobile in Chrome Dev Tools.
4. Switch to the Sources tab.
5. Navigate through the source tree and open a JavaScript file, e.g. js/services/authentication.js
6. Place a breakpoint on a line number.
7. Execute an action in CordovaSim, e.g. login
8. The execution will stop on the breakpoint in Chrome Dev Tools.
