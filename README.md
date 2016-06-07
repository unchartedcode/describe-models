# UnchartedCode Describe Models [![Build Status][travis-badge]][travis-badge-url]

Please note, this is mainly used internally at the moment. We are making certain decisions based on our needs.
If you would like to use this in your application then open an issue with your use case.

Generating ember-data schema from a backend definition. Meant to be used with the [ember-schema](https://rubygems.org/gems/ember-schema) gem.

## Installation

```bash
ember install:addon ember-cli-uncharted-describe-models
```

## Usage

**Users**: If you are using this library I'd love to hear from you. This project is used "internally" for several projects and the direction is currently driven by those. We'd be happy to see others using it as well.

There are two main pieces to this library.

  1. Automatically building model schema using a backend definition
  2. Extending DS.Model with some helpful mixins


### Automatically Defined Models

For the first part it is assumed that you generate a model for every backend model. However it's not necessary to define each field. What you need before any of this is a `schema.json`. It can be generated via the command line.

```bash
ember update-models --proxy http://localhost:5000
```

This assumes you have exposed `/api/models/describe` through the _ember-schema_ gem. It will write out `app/schema.json`.

Once you have that you can generate a model which will automatically pull field level and associations from the schema.

```bash
ember generate model User
```

which looks somewhat like this (in CoffeeeScript, if you use JavaScript let us know!)

```coffeescript
import DS from 'ember-data'
import GeneratedModel from '../utils/generated-model'

User = GeneratedModel('user').extend({

})

export default User
```

# Development

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[travis-badge]: https://travis-ci.org/unchartedcode/describe-models.svg?branch=master
[travis-badge-url]: https://travis-ci.org/unchartedcode/describe-models
