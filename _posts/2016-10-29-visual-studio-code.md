---
layout: post
title: Visual Studio Code
tags:
    - tools
    - visual studio code
---

I just moved from Sublime Text to [Visual Studio code][5], and it is good. 👍

I first tried VS Code in early 2016, but it was relatively early days and a few incomplete things put me off. More recently, I've been doing more test-driven development and was arranging my editor window with my terminal to be able to see the feedback from the tests. I then remembered that VS Code has a neat in-built terminal so I thought I'd give it another bash.

Hilarious wordplay aside, here are some useful VS Code tidbits I noted down...

# ES Lint

This tool had changed my life, so it was important for me that it worked just as well in VS Code.

Fortunately, there's an [ES Lint extension][1] that works seamlessly. I lean on this so much that I disabled VS Code's own JS checking and rely solely on ES Lint:

```javascript
// settings.json
{
    "javascript.validate.enable": false
}
```

# Syntax Highlighting

I had a bit of trouble getting full syntax-highlighting for all ESNext syntax. The mistake I made was initially going for the most popular Babel plugin.

I soon found [Sublime Babel][2] - a plugin that replicated the exact syntax hihlighting I was used to in Sublime text.

# Spacegray

Having grown awfully comfy with my Spacegray theme for Sublime Text, I was relieved to discover I wasn't alone: the [Spacegray VSCode theme][3] wraps the Sublime one quite nicely.

# Settings Sync

Now that I had everything set up just right, I wanted a way to keep my editor in sync on my work and home machines.

Shan Khan's [Settings Sync plugin][4] uses Github gists to store your settings and sync from anywhere. Genius.

[1]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[2]: https://marketplace.visualstudio.com/items?itemName=joshpeng.sublime-babel-vscode
[3]: https://marketplace.visualstudio.com/items?itemName=ionutvmi.spacegray-vscode
[4]: https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync
[5]: https://code.visualstudio.com/