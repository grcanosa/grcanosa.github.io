---
layout: post
title: Deactivating touchpad when an external mouse is connected Ubuntu 16.04 
tags: [setup,xps13,ubuntu]
comments: false
---

This one turned out to be [very easy](#https://askubuntu.com/questions/670038/ubuntu-14-04-can-i-automatically-deactivate-my-touchpad-when-a-usb-mouse-is-con). Just type:

```
gsettings set org.gnome.desktop.peripherals.touchpad send-events disabled-on-external-mouse
```

To see the available values:

```
gsettings range org.gnome.desktop.peripherals.touchpad send-events
```

And to get the current setting:

```
gsettings get org.gnome.desktop.peripherals.touchpad send-events
```