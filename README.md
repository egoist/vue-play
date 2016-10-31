![logo](./media/logo.png)

A minimalistic framework for demonstrating your Vue components, inspired by [react-storybook](https://github.com/kadirahq/react-storybook).

<details><summary>Table of Contents</summary>

<!-- toc -->

- [Getting started](#getting-started)
  * [The easy way](#the-easy-way)
  * [The hard way](#the-hard-way)
    + [App interface](#app-interface)
    + [Preview](#preview)
- [Component Shorthand](#component-shorthand)
- [Additional Component Properties](#additional-component-properties)
  * [example](#example)
  * [readme](#readme)
- [Showcase](#showcase)
- [API](#api)
  * [play.useComponents(components)](#playusecomponentscomponents)
    + [components](#components)
  * [play.describe(name, [callback])](#playdescribename-callback)
    + [name](#name)
    + [callback](#callback)
      - [add(scenario, component)](#addscenario-component)
        * [scenario](#scenario)
        * [component](#component)
  * [play.start([selector])](#playstartselector)
    + [selector](#selector)
  * [action](#action)
    + [action.log(data)](#actionlogdata)
    + [action.clear()](#actionclear)
- [Development](#development)
- [License](#license)

<!-- tocstop -->

</details>

## Getting started

### The easy way

```bash
# use npm or yarn
npm install -g vue-play-cli
cd my-vue-project
# run this to configure your project
vue-play
# to start developing `play app`
npm run play
# to build the `play app`
npm run play:build
```

### The hard way

There're two pages in your play app, one is the app interface which has a sidebar and it can toggle scenarios of your components, the other page is for rendering the examples, this page will be loaded as iframe in app interface.

And they both load scenarios that you write in the `playspot`, let's say `./play/index.js`:

```js
import play from 'vue-play'
import MyButton from './MyButton.vue'

play('MyButton', module)
  .add('with text', h => h(MyButton, ['text']))
```

#### App interface

```js
// ./play/app.js
import app from 'vue-play/dist/app'
import 'vue-play/dist/app.css'
// loads scenarioss at ./play/index.js
import scenarios from './'

// tell app what scenarios you have
app(scenarios)
```

#### Preview

```js
// ./play/preview.js
import preview from 'vue-play/dist/preview'
// loads the scenarios at ./play/index.js
import scenarios from './'

// actually render the scenarios in preview page
preview(scenarios)
```

Add `app interface` and `preview` to your webpack entry:

```js
module.exports = {
  // ...
  entry: {
    app: './play/app.js',
    preview: './play/preview.js'
  },
  // don't forget to generate html output for both of them
  plugins: [
    HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app']
    }),
    HtmlWebpackPlugin({
      filename: 'preview.html',
      chunks: ['preview']
    })
  ]
}
```

That's it, you're all set!

## Writing Scenarios

A scenario is a Vue component or a [component shorthand](#component-shorthand).

### Keeping Scenarios

You can keep scenarios anywhere you want, by default we keep them all at `./play/index.js`, you can also use separate files for them, or even name them `*.play.js` in your component directory and load them dynamically.

### Writing Scenarios

```js
import { play } from 'vue-play'
import MyButton from '../src/components/MyButton.vue'

play('MyButton', module)
  .add('with text', h => h(MyButton, ['hello world']))
  .add('with emoji', h => h(MyButton, ['😃🍻']))
```

### Loading Scenarios Dynamically

We can use Webpack's [require.context](https://webpack.github.io/docs/context.html#require-context) to load modules dynamically.

```js
import { configure } from 'vue-play'

const load = requireContext => requireContext.keys().map(requireContext)

const scenarios = load(require.context('../src/components', true, /.play.js$/))

configure(scenarios, module)
```

## Component Shorthand

If you only need `template` or `render` property for your component, you can use `component shorthand`, which means you can directly set the value of scenario to a template string or render function:

```js
play('Button', module)
  .add('template shorthand', '<my-button>text</my-button>')
  .add('render function shorthand', h => h(MyButton, ['text']))
  .add('full component', {
    data() {},
    methods: {},
    render(h) {}
    // ...
  })
```

## Additional Component Properties

The component for each scenario is a typical Vue component, but it can also accept some additional properties for documenting its usage, eg:

```js
play('Button', module)
  add('with text', {
    // a valid vue component
    ...component,
    // additional
    example,
    // ...
  })
```

### example

Type: `string`

The example code of your component.

### readme

Type: `HTML string`

Optionally display a readme tab to show detailed usage.

## Showcase

Feel free to add your projects here:

- [button example](http://vue-play-button.surge.sh/#/) - [source](https://github.com/vue-play/vue-play/tree/master/play)
- [vue-slim-modal](https://egoistian.com/vue-slim-modal/#/) - [source](https://github.com/egoist/vue-slim-modal/tree/master/playspot)

## Development

```bash
# run example play script
npm run play

# build vue-play
# you don't need this when developing
npm run build
```

## License

[MIT](https://egoist.mit-license.org) &copy; [EGOIST](https://github.com/egoist)
