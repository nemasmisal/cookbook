# CookBook

The project is part of my education during the course of VueJs in SoftUni University and has no commercial use. It is a simple VueJS project where i do practice how to use directives and event handling, components, forms and validators, filters, mixins, http requests, spa and routing, authentication and state management and unit testing. I've been using Vue 3, Vuex 4, Vue Router4, Vuelidate 2, Vue test-utils 2, Stylus 0.54. The project it self is a website for sharing cooking recipes. You can register an acount then create/share your recipe with the others or make it private, which means no body can see it, except you. You can also write short reviews to the others recipes.

## How to use it

#### Non register user

Non-register user can have access to the main, login, register and about page. Can read all public recipes, share recipes, see all reviews of each recipe.

#### Register user

Register user can have access to the same pages as non register but in top of that can create his own recipes, edit his recipes, remove his recipes, leave reviews to the other people recipes, see list of all his recipes (public and private).

#### Recipe

Each recipe must have name, type (public or private), short description, ingrediants (at least 1), link to an image(at least to show how it looks like, in case name is not meaningful), reviews (which are written by other users) and author. On the main page all recipes are displayed as a small card that have title, image, author and 3 icons(share, details, reviews). Clicking on the share icon/button will show small box with 3 posiblle options for sharing current recipe. Clicking the second button (3 dots icon) will open a box that contains information about the current recipe, starting with the description, following by the ingrediants. If you do try to cook the current recipe at the time of reading, you can simple click on each ingrediant and it will be marked with green color as you already use it during cooking. Clicking again on the same ingrediant will un-marked it.The last button (star icon) will show you all reviews (if there is) and give you chance to write yours (if you didnot yet) too.

## Project setup (Front-end part only)
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

## API setup

Can be found in my github account, following the same procedures 