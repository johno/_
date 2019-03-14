I love atomic css because it can bring consistency and clarity to an app, especially legacy apps.

It can be introduced ad hoc to build out new pages and components, even RESPONSIVELY!

It brings productivity to teams that used to write css to fix a button on the home page only to see it break in the dashboard..

It brings productivity to teams that used to build a page, ship it, and then rework it for viewports other than full screen MacBook Pros.

But I think, most importantly, it teaches a paradigm and language that is shared between designers and developers.

It is based on constraints and primitives that can be used to build out the majority of ui.

Sometimes better is worse.

It's not about fighting the one-off, but being a good fit for most rendered targets (mobile, tablet, desktop, native) for most aspects of a page.

This is precisely why I've followed OOCSS since I read stubbornella's media object article. It blew my mind. Same with rauchg's Pure UI.

This is why I've spent many hours studying and using approaches like jxnblk's Basscss.

This is why I've devoted many hours working on Tachyons with mrmrs_. I've been able to use it effectively on numerous production sites.

It's great. But it also leaves me thinking, this can't possibly be the best implementation?

So I've spent many hours pondering about what's missing, how can atomic css be improved, what's the next iteration?

The common approaches to solve these questions include new class naming schemes and css pre/post/sass processing.

There's merit to these approaches, but I believe they're treating the symptom of lackluster/unpredictable front end productivity rather than the root cause.

In some ways, these approaches further obfuscate intent or introduce performance issues.

Extends/mixins or postcss hacks are superficial fixes at best.

Atomic css without css in js is a stop gap.

In fact, I'd argue that atomic css should one of many outputs of your design system.

Especially in larger apps or companies, it's common to see numerous templating languages (html/erb/hbs/react/vue/native/etc.)

Where we achieve true productivity is combining components and the language of atomic css (read: design systems)

The prefect component speaks a design system's primitives and, when appropriate, a higher level api.

This higher level api isn't based on a class set, like atomic css often is, but a collection of properties. Though these props map to an atomic css class set.

Meanwhile, the primitives are generative based on type scale/colors/spacing/etc.

Functional libraries like React are best suited for this. They receive context and props and reproducibly generate an aesthetic output.

One of the benefits of atomic css is that with a declarative config of some sort, their class names can be generated from the css in js that exists in a design system and its components!

So, what I'm trying to say is, the language of atomic css is its most valuable characteristic.

It shows that a team can learn and communicate the steps of a type scale.

It shows that the community understands that css left unchecked suddenly becomes unmaintainable and a 1MB download.

And what we should be looking into isn't whether we should prefix or postfix our media query, but how we can use a shared design language to better serve a team.

My bet's on `<Flex color='gray' flexWrap='wrap' />`.

