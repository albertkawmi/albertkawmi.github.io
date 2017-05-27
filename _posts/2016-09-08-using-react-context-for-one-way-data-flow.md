---
layout: post
title: Using React Context for One-Way Data Flow
tags:
    - react
    - one-way data flow
---

To learn about this feature, I tried implementing a simple one-way data flow using just React context.

The [docs on React context](https://facebook.github.io/react/docs/context.html) start off with the sub-heading "Why not to use context" as it is one of these patterns that is open to abuse... but the API is pretty useful.

Due to a sudden and acute failure of imagination, here's another todo app (sorry):

```javascript
import React, { Component, PropTypes } from 'react';

const CONTEXT = {
  actions: PropTypes.object
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: {
        list1: ['item1', 'item2', 'item3'],
        list2: ['item4', 'item5', 'item6']
      },
      items: {
        item1: { id: 'item1', text: 'Item 1', completed: false },
        item2: { id: 'item2', text: 'Item 2', completed: false },
        item3: { id: 'item3', text: 'Item 3', completed: false },
        item4: { id: 'item4', text: 'Item 4', completed: false },
        item5: { id: 'item5', text: 'Item 5', completed: false },
        item6: { id: 'item6', text: 'Item 6', completed: false }
      }
    }
  }
  getChildContext() {
    return {
      actions: {
        createList: (id, items) => this.setState({
          lists: {
            ...this.state.lists,
            [id]: items
          }
        }),
        toggleItem: (id) => this.setState({
          items: {
            ...this.state.items,
            [id]: {
              ...this.state.items[id],
              completed: !this.state.items[id].completed
            }
          }
        }),
        getList: (id) => this.state.lists[id],
        getItem: (id) => this.state.items[id],
      }
    };
  }
  render() {
    return <Board lists={this.state.lists} />;
  }
}

App.childContextTypes = CONTEXT;

const Board = ({ lists }, { actions }) =>
  <div>
    {Object.keys(lists).map(listId =>
      <List key={listId} items={actions.getList(listId)} />
    )}
  </div>;

const List = ({ items }, { actions }) =>
  <ul>
    {items.map(itemId => <Item key={itemId} {...actions.getItem(itemId)} />)}
  </ul>;

const Item = ({ id, text, completed }, { actions }) =>
  <li>
    <input
      id={id}
      type="checkbox"
      checked={completed}
      onChange={() => actions.toggleItem(id)}
      />
    <span style={{
      color: completed ? 'gray' : 'black',
      textDecoration: completed ? 'line-through' : 'none'
    }}>{text}</span>
  </li>;

Board.contextTypes = CONTEXT;
List.contextTypes = CONTEXT;
Item.contextTypes = CONTEXT;
```

# Setting up 'actions'

The main part to point out is this bit in the root component:

```javascript
getChildContext() {
    return {
        actions: {
        createList: (id, items) => this.setState({
            lists: {
            ...this.state.lists,
            [id]: items
            }
        }),
        toggleItem: (id) => this.setState({
            items: {
            ...this.state.items,
            [id]: {
                ...this.state.items[id],
                completed: !this.state.items[id].completed
            }
            }
        }),
        getList: (id) => this.state.lists[id],
        getItem: (id) => this.state.items[id],
        }
    };
}
```

In this example I've got getters for each entity, but it would probably be easier to have a single `getState` action, like [Redux](http://redux.js.org/docs/introduction/) does.

# Accessing actions from child components

The context object is found on `this.context` for React `class` components. For `function` components, it's passed as the second argument after `props`:

```javascript
const Item = ({ id, text, completed }, { actions }) =>
  <li>
    <input
      id={id}
      type="checkbox"
      checked={completed}
      onChange={() => actions.toggleItem(id)}
      />
    <span style={{
      color: completed ? 'gray' : 'black',
      textDecoration: completed ? 'line-through' : 'none'
    }}>{text}</span>
  </li>;
```

Looking at the function signature above, the props `id`, `text` and `completed` are being destructured from the first argument (props) and the `actions` are taken from the second argument (context).

This way, any component in the app can access these actions.

# Minimal boilerplate
You need to set up the `childContextTypes` for the root component:

```javascript
const CONTEXT = {
  actions: PropTypes.object
}

App.childContextTypes = CONTEXT;
```

Then any child component that wishes to access this context must specify the context type it expects, for example:

```javascript
Item.contextTypes = CONTEXT;
```

Here `CONTEXT` is the same one defined for the `App.childContextTypes`.

And that's it. You need the above one-liner for any child component that requires context, but it's fairly light boilerplate.

# Limitations?

I've only used this on a toy example so far and am unsure how the idea scales in a bigger app. The fact that React docs warn against it is probably reason enough to avoid it on serious production work.

However, for quick apps, demos, hackday projects etc. I think this is an easy way to get up-and-running with one-way data flow using only React.

It saves having to pass callback functions down every level in your component tree.
