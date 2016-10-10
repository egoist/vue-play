import {play} from '../src'
import buttonReadme from './button-readme.md'

// a component that we'd like to play
const List = {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  render(h) {
    return (
      <ul>
        {this.data.map(item => (
          <li>
            <a href={item.html_url}>{item.full_name}</a>
          </li>
        ))}
      </ul>
    )
  }
}

play({
  Button: {
    'with text'(h) {
      return <button on-click={() => this.$log({foo: {bar: 123}})}>Text</button>
    },
    'with emoji'(h) {
      return <button>😄🤗😃😐😲</button>
    },
    'use single file component': {
      example: `<my-button :handle-click="handleClick">
  children
</my-button>`,
      readme: buttonReadme,
      render(h) {
        return <button on-click={() => this.$log('lol')}>lol</button>
      }
    },
    'use template Syntax': `<button>It's even more easier!</button>`
  },
  List: {
    'preset data'(h) {
      const data = [
        {html_url: 'https://github.com/vuejs/vue', full_name: 'vuejs/vue'},
        {html_url: 'https://github.com/egoist/eva.js', full_name: 'egoist/eva.js'}
      ]
      return <List data={data}/>
    },
    'fetch data': {
      example: '<List data={this.repos}/>',
      data() {
        return {repos: []}
      },
      created() {
        fetch('https://api.github.com/users/egoist/repos')
          .then(data => data.json())
          .then(data => this.repos = data)
      },
      render(h) {
        if (this.repos.length === 0) {
          return <span>Loading repos...</span>
        }
        return (
          <List data={this.repos}/>
        )
      }
    }
  }
})
