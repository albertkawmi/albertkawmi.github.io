---
layout: post
title: Useful git commands I always forget...
tags:
  - git
  - github
  - command line
published: true
---

Another random selection from my notes.

---

## Undo the last commit but keep the file changes
```
git reset HEAD~
```
---

## Ignore whitespace changes in Github diffs
On github, add a query param `?w=1` to the diff URL to ignore whitespace changes.

---

## Delete a remote branch
```
git push origin :the-remote-branch
```

---

## Rename a branch
```
git branch -m current-branch-name new-branch-name
```

---

## Checkout a single file from another branch
```
git checkout the-other-branch -- myFile.js
```

---

## Choosing files in merge conflicts
To choose the incoming file (the one being merged in...)

```
git reset -- conflicting-file.js
git checkout MERGE_HEAD -- conflicting-file.js
```

To keep the existing file (ignore the conflicting merged file...)

```
git reset -- conflicting-file.js
git checkout ORIG_HEAD -- conflicting-file.js
```

If it all goes wrong:

```
git merge --abort
```
