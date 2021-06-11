# Contributing

## Code of conduct

We expect all participants to read our [code of conduct](/CODE_OF_CONDUCT.md) to understand which actions are and aren’t tolerated.

## Development

For local development, clone this repo. Run `yarn run dev` to start the server. Import the components you'd like to work with into `Playground.tsx` and see your changes reflected on your localhost.

## Storybook

We use [Storybook](https://storybook.js.org/) to document our components. If you create a new chart component, new subcomponent used throughout the repo or add a new prop to an existing component, ensure any new states are covered by stories. Run `yarn storybook` to see our stories.

To get started creating a new story, you can use the command `dev add-story NameOfYourComponent --no-comments` for components in the top-level components directory. To ensure proper documentation is displayed, provide all your stories with a complete set of default props, and add a description of the prop in the `argTypes` object.

For complex props, like callback functions, consider adding a select to stories with a few different predefined options.

## Semantic versioning

Polaris Viz follows [semantic versioning](https://semver.org/).

Every significant change is documented in the [CHANGELOG](/CHANGELOG.md).

### Contributor License Agreement (CLA)

Each contributor is required to [sign a CLA](https://cla.shopify.com/). This process is automated as part of your first pull request and is only required once. If any contributor has not signed or does not have an associated GitHub account, the CLA check will fail and the pull request is unable to be merged.

## Bugs

### Where to find known issues

We track all of our issues and bugs in GitHub. If you are planning to work on an issue, avoid ones which already have an assignee.

### Reporting new issues

To reduce duplicates, look through open issues before filing one. The best way to get your bug fixed is to provide a reduced test case with a code example that can be used in the Playground.

## Feature requests

Before requesting a feature, search our issues. If it doesn't already exist, open an issue to start a discussion.

## Proposing a change

If you intend to build a new component, change a public API, make design improvements, or any other non-trivial changes, we recommend filing an issue so we can reach an agreement on the proposal before you put in time and effort.

If you’re fixing a bug, it’s okay to submit a pull request right away. We still recommend you file an issue detailing what you’re fixing in case we don’t accept that specific fix, but want to keep track of the issue.
