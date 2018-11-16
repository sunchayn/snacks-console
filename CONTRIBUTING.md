## How to contribute

### Before you start

<!-- This section contains conventions/standards contributors must follow -->
<!-- For example: Commit messages should follow angular standard -->

### Setting up

You may need to fork this project in [GitHub](https://github.com/mazentouati/snacks-console).

```sh
git clone git@github.com:mazentouati/snacks-console.git

# OR if you have a fork
git clone git@github.com:<your_github_handle>/snacks-console.git

# You may also add upstream
git remote add upstream https://github.com/mazentouati/snacks-console.git

cd snacks-console

# Create a new branch
git checkout -b $branch_name

# Install deps
composer install -o
```

### Moving forward

# If your feature takes long your dev branch might be out of sync, you may want to
git checkout $branch_name
git pull upstream master  # branch could be something else than master
```

### Finalizing

Everything looking good?

```sh
# Commit your stuffs
git add $file ...$files
git commit -m "..."

# Push 'em
git push origin HEAD
```

Now goto [GitHub](https://github.com/mazentouati/snacks-console/compare?expand=1), select your branch and create PR.

### Getting PR merged

You have to wait. You have to address change requests. Be patient.

Thank you for contribution!

**Lastly** Please be informed that your works will be licensed same as the project [license](./LICENSE)
