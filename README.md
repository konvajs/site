# Konva Website

The website for Konva. Created with Hexo framework.
You can see the generated files at [konvajs/konvajs.github.io](https://github.com/konvajs/konvajs.github.io) repository.

## How to help?

We need to replace jsbin code examples with iframe example and code snippet.
All demos will be stored in this repo. It will much ease to maintain them.

You can see `source/docs/shapes/Rect.md` (docs) and `source/downloads/code/shapes/rect.html` (working code snippet).
All demos should be stored under `source/downloads/code`.


## Getting started

Install dependencies:

``` bash
$ git clone https://github.com/konvajs/site.git
$ cd site
$ npm install
```

Generate:

``` bash
$ gulp generate
```

Run server:

``` bash
$ gulp server
```

## Requirements

- [Hexo](http://hexo.io/)

	``` bash
  $ npm install hexo -g
  ```

- [Gulp](http://gulpjs.com/)

	``` bash
	$ npm install gulp -g
	```