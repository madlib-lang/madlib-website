Interfaces are a tool to extend type definitions generically. In order to articulate this, let's take a concrete example.

Firstly, let's see how we can implement an inspection function for a tuple without interfaces. The function should take a 2-tuple as input, and return its String representation:

```madlib
inspectList :: #[a, b] -> String
inspectList = (tuple) =>
  where (tuple) {
    #[a, b] =>
      `#[${inspectA(a)}, ${inspectB(b)}]`
  }
```

`inspectA` and `inspectB` are not yet defined. We'd like to define them, but the issue is that these are indefinite types and could be any type. Madlib does not provide reflection tooling like Java, which might allow us to determine at runtime how a given value is structured. However, interfaces can provide an excellent means of overcoming this problem!

Let's see how we can define the interface for our inspect problem:
```madlib
interface Inspect a {
  inspect :: a -> String
}
```

So with the above we are saying `Inspect` is implemented for a generic type `a`; we can call the interface method `inspect` with values of that type and return a String. This is also known as a _constraint_.

Now we can use constraints within type annotations to declare that a type variable implements an interface. The fat arrow is used for this purpose:
```madlib
Comparable a => a -> a -> Boolean
```
Here the type annotation tells us that the function must be called with values of a type (`a`) that implement the interface `Comparable` otherwise we'll get a compilation error which will yell that we're not meeting the defined constraint.

Coming back to our initial problem; we'd like to implement Inspect for the type `#[a, b]`. To do this, we can also constrain types in the head of an instance declaration:
```madlib
instance (Inspect a, Inspect b) =>
  Inspect #[a, b] {
    inspect = (tuple) =>
      where (tuple) {
        #[a, b] =>
          `#[${inspect(a)}, ${inspect(b)}]`
      }
  }
```
Now with this instance constraint we need not care about how `inspect` will be performed for the types contained in the tuple. The `inspect` method will be dispatched to the underlying implementation, based on the concrete types the method is called with.

So, `inspect(#[1, true])` would respectively call the method from `Inspect Integer` and `Inspect Boolean`.
