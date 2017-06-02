---
layout: post
title: Building a CMS with React & Redux
tags:
    - react
    - redux
    - javascript
---

I built the front-end of a CMS in React/Redux and wrote down a few points of learning and discussion.

Prior to this project I had built website admin areas or content management systems using Node/Express and Angular 1. Switching to React + Redux on this project worked out well for the product as well as the development experience.

Whilst not my first React work, this was my first non-toy Redux app. The notes are mostly about tools, libraries and architectural considerations.

# Use `create-react-app`

On this project I went through the trials and tribulations of setting up webpack to:

* transpile and build the JS bundle,
* compile SASS and build styles,
* setup a dev server with hot-relaoding,
* run a production build.

This took a lot of time to get working. Whilst learning the ins-and-outs of Webpack was probably worthwhile, I'm always sceptical of _any_ time spent on tooling.

About half-way through the project [Create React App][1] was released and I started using it to hack on side-projects. It hides away all the webpack details and provides a basic default setup. But as soon as your project outgrows this, you can `npm run eject` and dive right in to the config.

The project is open-sourced by Facebook and driven by Dan Abramov, the creator of Redux.

# Use Redux DevTools

For some reason I put off using this for about a third of the project's duration. But once the complexity had ramped up, a colleague looking over my shoulder insisted I get this in. If you're building any non-trivial Redux app, [just get Redux DevTools installed][2].

It's one of the great boons of using Redux in the first place.

# Keep your store normalised

This is standard advice [from the Redux docs][3] and Dan Abramov demonstrates the ideas [in this short egghead.io tutorial video][4]. But at the start of the project, when the app was relatively simple, I couldn't see the value of restructuring my data store differently to the API responses from our back-end.

For the most part I took those responses and dumped them in the store. At first I got away with it because:

* it was quick to build up many views in the app,
* I didn't know how much/little of each data type I would ultimately need, so I kept it all in memory,
* the back-end API was also work-in-progress so this kept things flexible,
* and no two parts of the app depended on nested data within different parts of the store.

An example for the last point: in a CMS for managing TV programmes you might have a "programme" object with nested "collections" of "episodes". At first, only programme-related views were interested in those nested collections, so there was no problem.

As more features were added, other views needed to know about - and update - nested portions of the store. Worse still, duplication started creeping into the store that led to some views getting stale data. This forced updates to be made in multiple places within the store for a single data change. It made the reducer logic needlessly complex.

From now on, I normalise my stores as a matter of course. It keeps things clear and consistent, allowing the app to grow more easily. And it's way easier to do it at the outset than to go back and refactor.

# Consider breaking up the SPA

On this project we went whole-hog Single-Page Application. That means no page refreshes for any interaction.

This had nice benefits for UX. There were a few different navigation/browsing/searching workflows that felt much faster and responsive as a SPA.

The challenge with a CMS though is that the data must always be up-to-date, especially in any view where you're going to be making edits. This is even more important with multiple users making changes simultaneously (and leaving their sessions open for days at a time). It makes it hard to cache data in memory for a long time and, for many views (and all forms) we ended up hitting the back-end repeatedly to keep data fresh.

In part this was due to self-imposed limitations of our wider architecture. But ultimately, there were sections of the SPA that could easily be broken out to separate pages without massively impacting the UX or the perceived performance.

Whilst it might not work for every app, it's worth keeping this idea in mind as a potential trade-off of UX vs front-end complexity. I should also note that this applies to any SPA, not just React/Redux...

# Redux-CRUD

I looked at the [Redux CRUD library][5] at the outset of the project but decided it was better to write all my own reducers. In terms of becoming more confident with Redux, this was probably a good decision for me at that time.

I also took a lot of ideas from it and ended up building action-creators of my own that looked an awful lot like those from Redux-CRUD.

But since then, I've worked on a couple of CRUD apps and the Redux-CRUD library has saved a lot of boilerplate. It's easy to learn, keeps things consistent and is extensible where it needs to be.

# Redux-Form

Another excellent library. My experience with [Redux Form][6] had positives...

* It saved me a LOT of time and boilerplate.
* It acted as a framework for forms across the app, keeping things consistent.
* It handled all the stuff like validation, error-reporting, clean/dirty checking, computed fields, nested fields and more - stuff that would be tricky to roll-your-own

...and negatives...

* I found the version 5 API hard to learn and a bit confusing in places.
* It made a stamp on the app in such a way that incoming developers _have_ to learn Redux Form in order to understand what's happening.
* Changes in React 15.2 caused a wall of red warnings in the console.

The last point is [discussed in detail here][7] and is no longer a problem in version 6+. However, migrating our app from 5 to 6 is not a simple matter. For now we are living with it, but it's technical debt that will need to be fixed eventually.

Ultimately, this was just a bit of bad luck with the timing of the version 6 release (right at the end of our project). Redux Form is a powerful tool and I'd definitely use the much-improved 6.x API on future projects.

# Building React Applications With Idiomatic Redux

The last thing I want to point to is [this excellent (free) video series][8] from Dan Abramov. It came out towards the end of this particular project, and sums up everything I wished I knew at the outset. Recommended if you're building any sizeable React/Redux application.

[1]: https://github.com/facebookincubator/create-react-app
[2]: https://github.com/gaearon/redux-devtools
[3]: http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
[4]: https://egghead.io/lessons/javascript-redux-normalizing-the-state-shape
[5]: https://github.com/Versent/redux-crud
[6]: http://redux-form.com/6.7.0/
[7]: https://github.com/erikras/redux-form/issues/1249
[8]: https://egghead.io/courses/building-react-applications-with-idiomatic-redux