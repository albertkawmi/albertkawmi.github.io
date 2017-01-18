---
layout: post
title: Get Jekyll working with github-pages on Mac OSX
tags:
    - jekyll
    - static sites
    - github
---

Jekyll is a static site generator that's deeply integrated with Github Pages. I had to jump through some hoops to get it working on Mac...

I installed to /usr/local/bin because it's already in my .bash_profile `$PATH`:

```bash
sudo gem install -n /usr/local/bin github-pages
```

Then got an error, saying something was out of date, so:

```bash
sudo gem update --system
```

Still getting an error unable to install gem. The Jekyll troubleshooting page suggests this:

```bash
xcode-select --install
```

🤔 Not sure what that does, exactly, but let's try again now:

```bash
sudo gem install -n /usr/local/bin github-pages
jekyll -v
```

Hey, it worked.
