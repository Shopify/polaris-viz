# 📦 Creating Releases

**Note🗒️** The following steps require admin access to the Shopify/polaris-viz GitHub repo.

## 1. Preparing local environment

```sh
git checkout master && git pull
```

**Note🗒️** `git pull` should be used instead of `git pull origin master` to ensure that tags are pulled as well.

## 2. Versioning and tagging

- Begin the release process:

```sh
yarn version-bump --force-publish
```

- Follow the prompts to choose a version.

**Note🗒️** Polaris Viz packages adhere to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

This command will update all CHANGELOGs to add headings for the new versions you selected.

**Note🗒️** Prereleases will not update CHANGELOGs automatically.

## 3. Pushing Changes

The following will push the changes and new tags to GitHub:

```sh
git push origin main --follow-tags
```

## 4. Deploying to npm

- Log in to [Shipit](https://shipit.shopify.io/shopify/polaris-viz)
- When CI is 🍏 on the commit titled `vX.X.X`, press `Deploy` to update packages on npm.

<br />

# 🎩 Releases for tophatting changes?

### Step 1 - Publish a `beta` release for testing

- In your branch, run `yarn run release`. Lerna will launch its CLI to select a version for the changed packages. Select the `Custom` option and enter a version with a `-beta.X` suffix (e.g. `0.29.10-my-feature-beta.1`).

  **Note:** Ensure your version includes the `-beta` suffix. This is how [Shipit dictates](https://github.com/Shopify/shipit-engine/blob/master/lib/snippets/publish-lerna-independent-packages#L7-L12) a beta release.

- Push your branch to GitHub with the newly created tags using `git push origin <branch> --follow-tags`
- Create a temporary stack in Shipit that points to your dev branch. Set the branch to your PR/feature branch and update the environment to something specific to your feature (e.g. test-cool-feature)
  ![Create Shipit Stack](../images/shipit-stack.png)

- Hit the Deploy button on your Publish commit in Shipit to publish your beta release to npm

### Step 2 - Consume the release

- Add your release to a repository that uses the package you are testing:

```sh
yarn add @shopify/polaris-viz@1.0.0-my-feature-beta.1
```
