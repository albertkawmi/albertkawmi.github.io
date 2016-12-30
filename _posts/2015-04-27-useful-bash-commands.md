---
layout: post
title: Useful bash commands I always forget...
tags:
  - bash
  - command line
published: true
---

A mixed selection. Maybe if I write them down, I'll remember them.

Warning: I've mostly used these on Mac OS X, not Linux.

### One `>` overwrites, two `>>` appends
```bash
cat hello.txt >> world.txt
```
I almost always want `>>`, OK?

### Find the total disk usage of a directory
```bash
du -hcs dirname
```
The option `h` is for human-readable, `c` is the total count and `s` gives a summary (as opposed to a breakdown). [More...][1]

### Check a file's MIME type
```bash
file --mime-type -b filename
```

### Using the `find` command and `exec`uting a command on each matching file
```bash
find . -type f -name '*.txt' -exec sed -i '.bak' s/this/that/ {} +
```
Let's break this one down. We want to `find`
* in `.` the current directory (or this `could/be/any/path`)
* something that has a `-type` of `f` for file
* whose `-name` mathches this regular expression `*.txt`
* then `-exec`ute this following command for every file that matches
* `sed` replace text in the file, and do this `-i`n place
* but before you do, make a backup with extension `'.bak'`
* then replace `s/this/that` (the word 'this' for the word 'that')
* for the file passed from `find` via curly braces `{}`
* and the `+` at the end passes all matching file names to the `exec` command (this is a bit confusing but [this Stack Overflow answer][2] helped)

### My most common used grep arguments...
```bash
grep -rli --exclude-dir=libs "videoPlayer" app/js
```
Nothing special here. `-r` will recursively search directories, `-i` is case-insensitive and `-l` will not output matching lines (just the filename). Sometimes it's useful to `--exclude-dir`ectories (e.g. node_modules)

By force of habit, I still prefer `grep` to other text search tools 🤓

### Grepping your command history
```
history | grep test.txt
```
`history` will list your most recent terminal commands. Piping `|` this to `grep` will filter those commands that match, in this case that contain `ssh`.

Matching commands will be preceded by an ID number like `509 touch test.txt` and you can run this command again by typing an exclamation mark followed by the ID, in this case `!509`.

In this example, my use case is "what was a recent command I ran on test.txt? I want to run it again..." Can be handy for those long, cryptic commands that you need to go back to.

[1]: http://ss64.com/bash/du.html "du man page"
[2]: http://stackoverflow.com/questions/6085156/using-semicolon-vs-plus-with-exec-in-find#answer-6085237 "+ vs ; when using find and exec"
