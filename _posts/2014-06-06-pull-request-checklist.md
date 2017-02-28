---
layout: post
title: Pull Request Checklist
tags:
    - workflow
    - code review
---

A list compiled from past mistakes...

Have I merged in the latest version of master?

Have I resolved any merge conflicts?

Have I checked for JSLint errors in my editor?

Have I completed all required build steps?

Have I run all necessary tests?

Have I included any required database changes?

Have I tested my *latest* commit on local?

Have I pushed my *latest* commits to remote?

Have I tested in different browsers/devices where relevant?

Have I reviewed every change in the diff?

Have I removed any `console.log`s, `debugger` statements or commented-out code?

Have I checked the modified files are as I expect and include any necessary images or assets?

Have I sense-checked any large files where diff was suppressed?

Have I checked file permissions and caching for static assets like images?

Have I tagged the relevent team members?

Have I provided a useful PR message (that doesn't just echo the PR title)?

Have I linked to the relevant user story or issue?

Have I linked to any related/dependent PRs?
