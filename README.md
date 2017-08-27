# Zander


[![version npm](https://img.shields.io/npm/v/zander.svg?style=flat-square)](https://www.npmjs.com/package/zander)
[![dependencies](https://img.shields.io/david/carbonrider/zander.svg?style=flat-square)](https://david-dm.org/carbonrider/zander)
[![devDependency Status](https://david-dm.org/carbonrider/zander/dev-status.svg)](https://david-dm.org/carbonrider/zander#info=devDependencies)
[![Build Status](https://travis-ci.org/carbonrider/zander.svg?branch=master)](https://travis-ci.org/carbonrider/zander)

A configurable dependency injection for Node.JS without a need to patch `require` or manually injecting references.
Simple, easy to get started and bundled with examples to bootstrap your project.

## Usage
Install zander using your favorite package manager : npm

```
npm install zander --save
```

Once you have configured zander in your project, here is the next step.

### Javascript

```javascript
"use strict";
var zander = require('zander');
var path = require('path');
var configLoader = new zander.SimpleFilePathMatchLoader(["modules/module.json"]);
var depManager = zander.DependencyInjection({ configLoader: configLoader, modulePath: path.join(__dirname, 'modules') });
depManager.configure();
```

Note that the `configure` function returns `Promise` which can be used to get references of beans or perform any activity
which requires all the beans are in ready state. The examples could include start listing on 8080 port after all services
are ready. Refer to following code block for details

```javascript
depManager.configure().then(function (configured) {
    console.log("All beans are initialized and injected.");
    var customerBean = depManager.getBean("customer");
    customerBean.greet();
});
```

## Multiple beans under one folder
In case, if you have multiple beans under one folder due to the grouping requirements your project has, Zander offers `path`
attribute for bean declaration. Refer to multi-bean example for more details.

## Module configuration

Zander supports both simple path matching and glob style path matching support for loading configuration files.
Just replace `SimpleFilePathMatchLoader` with `WildcardFilePathConfigLoader` and you can specify wildcard path.

## Split configuration

Zander supports splitting configuration of beans across multiple files and its programmed to identify dependencies
in correct order. As a developer you are free to split configuration as per logical groups of beans. For e.g. all
service beans in one file, while all business logic and data access bean definitions in another file.

## Zander in action

Zander doesn't require to inherit nor make any references to the core framework in your beans. The current implementation
supports injecting dependencies using constructors.

A typescript project with zander integration can be found at - [Zander-simple](https://github.com/carbonrider/zander-simple)

# Example
Lets get started with zander.

First create a project with following command

```
npm init
```

This will create NodeJS project in the current directory by creating `package.json`. Issue following command to install zander.

```
npm install zander --save
```

Once the installation is complete, create a new folder `modules`. This directory will serve as a folder for grouping testable code
that we will create in next few steps. Inside `modules` folder create `module.json` file, which will be used to declaratively
define and inject our modules. The directory structure will look like below

```
your_project_dir
├───package.json
├───modules
│   └───module.json
├───node_modules
│   ├───balanced-match
│   ├───bluebird
│   ├───... other dependency folders
│   └───zander
```

Now create two folders - `user` and `greeting` with `index.js` file in each folder. Also create `index.js` folder at the root of
the project directory. The directory structure will now look like below
```
your_project_dir
├───index.js
├───package.json
├───modules
│   ├───user
│   │   └───index.js
│   ├───greeting
│   │   └───index.js
│   └───module.json
├───node_modules
│   ├───balanced-match
│   ├───bluebird
│   ├───... other dependency folders
│   └───zander
```

Open `user\index.js` file in your favourite editor and paste following code.

```javascript
"use strict";

var User = (function(){
  function User(greeting){
    this.greeting = greeting;
  }

  User.prototype.greetUser = function(username){
    this.greeting.greet("Hello " + username);
  };

  return User;
})();

module.exports = User;
```

Open `greeting\index.js` file and paste following code.

```javascript
"use strict";

var Greeting = (function(){
  function Greeting(){
  }

  Greeting.prototype.greet = function(message){
    console.log(message);
  };

  return Greeting;
})();

module.exports = Greeting;
```

Did you notice? `User` bean is dependent on `Greeting` bean but it doesn't explicitly uses `require` function to reference it.
Rather it assumes the bean reference will be passed via constructor. Lets complete the dependency part, by entering following code
in `modules\module.json`

```
{
  "user":{
    "construct":["greeting"]
  },
  "greeting":{
    "construct":[]
  }
}
```

`user` and `greeting` serve as a bean references, if you wish to assign different identifiers (other than directory name), you can
change it. But you should also define additional path to indicate where the bean is located. Refer the below configuration with
different names. (skip this step, if you do not wish to change the bean names.)
```
{
  "userBean":{
    "construct":["greetingBean"],
    "path":"user"
  },
  "greetingBean":{
    "construct":[],
    "path":"greeting"
  }
}
```
Additionally, if you wish to assign different names or want to add multiple beans under one folder, you can do so but enter the name
of the file along with folder name without extension. (skip this step, if you do not wish to assign different name to `index.js`)
```
{
    "user":{
      "construct":["greetingBean"],
      "path":"user/my_custom_file"
    }
}
```

Now, open `index.js` at the root of the project and paste following code.

```javascript
"use strict";
var zander = require('zander');
var path = require('path');
var configLoader = new zander.SimpleFilePathMatchLoader(["modules/module.json"]);
var depManager = zander.DependencyInjection({ configLoader: configLoader, modulePath: path.join(__dirname, 'modules') });
depManager.configure()
.then(()=>{
  console.log("All beans are created.");
  var userBean = depManager.getBean("user");
  userBean.greetUser("John");
});
```

Note above code will boostrap `zander` by specifying the location of the directory of dependency injection and once the injection
is complete, you can reference a bean and invoke method on it. Time to run our sample project and check the ouput. Execute following
command at the root of the project in command prompt.

```
node index.js
```

and you should see following output

```
All beans are created.
Hello John
```

Sounds Simple! No messy references in the logical code, no additional coding required to manage dependencies, no need to patch `require`.