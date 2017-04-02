This overview mostly for myself and people who intended to work on project.

## App structure

App structure follows the sake of convenience and clarity. App source files divided into several main folders:

### tools
Place for reusable app-agnostic utilities which could even be used separately from app. Tools not limited to be tiny or large but should know nothing about app. However tools could depend on other tools. Only circular dependencies are Not allowed.

Tools are not interface things.

### lib
For now it is a place for reusable controls. Those controls are also app-agnostic.

### components
This dir contains App by itself.

Components is considered to be in logical groups — Blocks (slight and imprecise parallel to bem). Block is responsible for logical part of app, such as journey importing form or some statistics presenter.

Technically each Block is responsible of its own part of redux store state. Store related code is placed in api section. It's part of loose coupling strategy. However, actions and reducers is not encapsulated within block, and can be explicitly imported from it.

Each component could be presentational or container as explained in Dan Abramov [article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). Presenter components always ends with «Presenter» in their name. Container components is free of similar rule.

 If presenter components belong to container only it should lay inside container directory. If it shared, it could be hoisted to a block directory.

 Presenter components is redux-agnostic.

 Each component could be present as single ComponentName.jsx file, or, when became more complex turn into Component name directory, which contains component source in index.jsx file and may contain style.scss file, presenters components and other resources.

 Redux api could be placed in single api.js file, or splitted inside api directory into:
 - actionCreators.js
 - actionTypes.js
 - reducers.js
 - propTypes.js which contains store propTypes
 - index.js which explicitly exports part of api that allowed to use outside of block.

 redux declarations could be used outside of the block:
 - for combine reducers
 - to emit actions (is it necessary?)
 - to process actions in external reducers

#### i18n
 Internalization is implemented like an usual component, but placed separately because it requires translations to be within. And translations is other important part of project, separately from the code. So access to them should not overlap much with the rest codebase.
