---
layout: post
title: An Introduction to the Swift Programming Language - Part One
summary: This is the first part of many that chronicles my exploration into Apple's new programming language, Swift.
tags:
  - swift
date: 2014-06-04
slug: /swift/2014/06/04/an-introduction-to-the-swift-programming-language-part-one/
---

## Introduction

Swift was the result of many years of hard work by Apple. The results are a high-level language with a robust framework infrastructure that incorporates Automatic Reference Counting (ARC) and an elegant, scripting language-like feel.

What really sets Swift apart from its predecessor, Objective-C, is its friendly disposition for new developers and the playground support. The development environment introduces a REPL that provides valuable feedback to developers, making debugging significantly simpler than before.

Additionally, the syntax is elegantly terse, straying away from the baroque nature of Objective-C that scared many aspiring mobile developers away.

## Swift in action

In order to get started, open up Xcode 6 and select "Get started with a new playground".

<br />
![playground](https://cloud.githubusercontent.com/assets/1424573/3183147/420fe066-ec63-11e3-8b10-ae2c4a6d094e.png)
<br />

After specifying a playground name, you will be presented with the following code.

```
// Playground - noun: a place where people can play

import Cocoa

var str = "Hello, playground"
```

On the right hand side, you will also see the words "Hello, playground". This is the result of Xcode's REPL for Swift, displaying the value of the variable `str`.

<br />
![repl](https://cloud.githubusercontent.com/assets/1424573/3183148/4517e6b4-ec63-11e3-835e-ac1ac676e76b.png)
<br />

#### Immutable and Mutable Variables

The keywords `var` and `let` are used to specify variables. `let` will result in a constant, or immutable variable, while `var` results in a mutable variable.

So, for example, the following code will result in an error:

```
let myConstant = "This is an immutable string"
myConstant = "Can't do this"
```

The second line, where `myConstant` is reassigned, is where the error is raised. Since the keyword `let` was used, the variable can no longer be reassigned. However, using `var` will create a mutable variable, and all will be fine:

```
var myVariable = "This is a mutable string"
myVariable = "Can do this"
```

#### Types

Types will be implicitly determined if a variable type isn't explicitly stated. The following code illustrates the difference between explicit and implicit type declaration:

```
let myString: String = "My explicitly declared string"
let anotherString = "My implicitly declared string"

let myFloat: Float = 100      // Explicit declaration
let myDouble = 10.0           // Implicit declaration
let anotherDouble: Double = 1 // Explicit declaration
```

Swift is weakly-typed, so a variable cannot be assigned a type that is different than it's initial declaration, otherwise an error will be raised. However, you can cast objects. Additionally, implicit type conversion doesn't occur, so you must convert a variable to the correct type explicitly:

```
var favoriteNumberDescr = "My favorite number is "
var favoriteNumber = 7
favoriteNumberDescr + String(favoriteNumber)
```

Luckily, Swift provides some syntactic sugar to string interpolation that's very similar to Ruby. You can use `\()` to interpolate:

```
var favoriteNumber = 7
"My favorite number is \(favoriteNumber)"
```

#### Arrays and Dictionaries

Arrays and dictionaries are the primary toolset for most developers, so every modern language should provide simple, elegant syntax to declare them. Swift does just that.

```
let arrayOne = String[]()
let arrayTwo = []

let dictionaryOne = Dictionary<String, Float>()
let dictionaryTwo = [:]
```

#### Functions

The keyword `func` is used to declare functions. The "stab", `->`, is used to point to a function's return type.

```
func printStr(strToPrint: String) {
    println(strToPrint)
}

func getHelloStr(helloRecipient: String) -> String {
    return "Hello, \(helloRecipient)"
}
```

Functions can also return other functions:

```
func makeIsOneCheck() -> (Int -> Bool) {
    func isOne(val: Int) -> Bool {
        return val == 1
    }
    return isOne
}

var isOneCheck = makeIsOneCheck()
isOneCheck(1) // true
isOneCheck(7) // false
```

Thera are other functions like `map` that take functions as arguments:

```
numbers = [1, 2, 8, 16]

func divideByTwo(number: Int) -> Int {
    return number/2
}

numbers.map(divideByTwo)
```

#### Closures

Instead of passing functions as arguments, you can use closures indicated by `{}`:

```
let numbers = [1, 4, 8, 234, 12]

numbers.map({
    (number: Int) -> Int in
    return number / 2
})

// More tersely:
[1, 4, 8, 234, 12].map({
    (number: Int) -> Int in
    return number / 2
})

// Even more tersely:
[1, 4, 8, 234, 12].map({ number in number/2 })
```

The `in` is a keyword that separates arguments from the return type of the closure's body.

> <h5>Something weird I should point out</h5> For whatever reason, closures have an implied return statement. This means that the last line of a closure is automatically returned, even if it isn't explicity declared. However, functions are required to have the return statement declared. This is a bit strange and indubitably quirky. However, its something that I can live with since it's an arguably small wart at this point.

#### Classes and Objects

Classes in Swift are quite terse and simple. Adding properties, with a getter and setter, only requires declaring a variable in the class, using `let` for a constant property and `var` for a mutable data type.

The instantiation of a class always calls the `init()` method, if available. This serves as the constructor. You can add named parameters in order to accept data, optional or not, upon instantiation.

Look at the following implementation of a `User` class below for an example of Swift's class syntax and structure:

```
class User {
    var username: String = ""
    var email: String = ""
    var favoriteFood: String = ""
    var favoriteNumber: Int

    init(email: String, favoriteNumber: Int) {
        self.email = email
        self.favoriteNumber = favoriteNumber
    }

    func description() -> String {
        return "\(username) with email \(email) who likes the number \(favoriteNumber) and eating \(favoriteFood)"
    }
}
```

The properties `username`, `email`, `favoriteFood`, and `favoriteNumber` are all declared at the top. Since the keyword `var` is used, we know these are mutable. The `init` method is the constructor which accepts named paramters for `email` and `favoriteNumber`. In the method body there's `self.` which is used to differentiate between the local variable and the instantiated class property. There's also a function called `description()` that returns a string that describes the object.

Now, in order to instantiate a `User` object, we can do the following:

```
let user = User(email: "johnotander@gmail.com", favoriteNumber: 7)
```

We can also access the object's properties with:

```
user.email
```

Additionally, we can call methods with:

```
user.description()
```

Notice that the parenthesis are required for the method, but not for the property.

## Conclusion

Thus far, Swift looks very exciting and is a delight to use. Please stay tuned for Part 2 of my Swift exploration.
