# Contributing to CypressTemplateRyan

Thank you for your interest in contributing to the Cypress Test Automation Template! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Fork and Pull Request Workflow](#fork-and-pull-request-workflow)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Development Guidelines](#development-guidelines)
- [Testing Requirements](#testing-requirements)
- [Commit Message Format](#commit-message-format)
- [Commit Signoff Requirement](#commit-signoff-requirement)
- [Documentation Updates](#documentation-updates)
- [Code Review Process](#code-review-process)
- [For Maintainers](#for-maintainers)

## Getting Started

This repository is public and forkable. The `main` branch is protected and requires:
- Pull requests for all changes (no direct pushes)
- At least 1 approving review from a code owner
- All CI status checks to pass (including CodeQL analysis)
- **All contributors, including administrators, must follow branch protection rules**

## Fork and Pull Request Workflow

Since direct pushes to `main` are not allowed, all contributions must follow this workflow:

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy of the repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/CypressTemplateRyan.git
cd CypressTemplateRyan
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/Ryansutton370/CypressTemplateRyan.git
```

### 4. Create a Feature Branch

Always create a new branch for your changes (never work directly on `main`):

```bash
git checkout -b feature/your-feature-name
```

See [Branch Naming Conventions](#branch-naming-conventions) below for naming guidelines.

### 5. Make Your Changes

- Write clean, maintainable code
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed

### 6. Commit Your Changes

Follow the [Commit Message Format](#commit-message-format) and ensure commits are signed (see [Commit Signoff Requirement](#commit-signoff-requirement)).

```bash
git add .
git commit -s -m "feat: add new feature description"
```

### 7. Keep Your Branch Up to Date

Before pushing, sync with the upstream repository:

```bash
git fetch upstream
git rebase upstream/main
```

### 8. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 9. Open a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the pull request template completely
4. Link any related issues
5. Wait for CI checks to pass and request review

## Branch Naming Conventions

Use descriptive branch names with the following prefixes:

- `feature/` - New features or enhancements
  - Example: `feature/add-api-auth-tests`
- `fix/` - Bug fixes
  - Example: `fix/login-timeout-issue`
- `docs/` - Documentation changes
  - Example: `docs/update-contributing-guide`
- `refactor/` - Code refactoring without changing functionality
  - Example: `refactor/page-object-structure`
- `test/` - Adding or updating tests
  - Example: `test/add-coverage-for-crud-actions`
- `chore/` - Maintenance tasks, dependency updates, etc.
  - Example: `chore/update-cypress-version`

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Maintain consistency with existing code patterns

### Page Object Model Pattern

- All page elements must be defined in Page Object classes
- Extend `BasePage` for all new page objects
- Define locators using `getCSSLocators()` or `getXPathLocators()` methods
- Prefer CSS selectors over XPath when possible

### Step Definitions

- Keep step definitions atomic (one logical action per step)
- Place reusable steps in `Common.ts`
- Create page-specific step files for complex page logic
- Use descriptive Gherkin language

## Testing Requirements

### Running Tests Locally

Before submitting a PR, ensure all tests pass locally:

```bash
# Run all tests
npm test

# Run tests in interactive mode
npx cypress open

# Run specific feature
npx cypress run --spec "cypress/integration/features/YourFeature.feature"
```

### Test Requirements for PRs

- All existing tests must pass
- New features must include corresponding tests
- Bug fixes should include regression tests
- Aim for meaningful test coverage

### Test Data

- Use fixtures for test data (`cypress/fixtures/`)
- Keep test data separate from test logic
- Use descriptive fixture file names

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates
- `perf:` - Performance improvements
- `ci:` - CI/CD changes

### Examples

```
feat(api): add authentication to CRUD operations

Added bearer token support for API testing with configurable
authentication headers.

Closes #123
```

```
fix(locator): resolve issue with dynamic element selection

Fixed bug where LocatorService couldn't find elements on pages
with dynamic URL parameters.

Fixes #456
```

## Commit Signoff Requirement

All commits must include a "Signed-off-by" line to certify that you have the right to submit the code under the project's license (Developer Certificate of Origin).

### Method 1: Command Line

Use the `-s` or `--signoff` flag when committing:

```bash
git commit -s -m "feat: your commit message"
```

This adds the following line to your commit message:

```
Signed-off-by: Your Name <your.email@example.com>
```

### Method 2: GitHub Web UI

When creating or editing files through the GitHub web interface, check the "Add a sign-off message to the commit" box before committing.

### Method 3: Retroactive Signoff

If you forgot to sign off your commits:

```bash
# For the last commit
git commit --amend --signoff

# For multiple commits
git rebase --signoff HEAD~N  # where N is the number of commits
```

## Documentation Updates

When making changes that affect how users interact with the framework:

1. **Update README.md** if the change affects:
   - Getting started instructions
   - Project structure
   - Configuration
   - Running tests

2. **Update CONTRIBUTING.md** if the change affects:
   - Development workflow
   - Testing requirements
   - Code style guidelines

3. **Add inline comments** for complex logic or non-obvious implementations

4. **Update feature files** to reflect new functionality or changed behavior

## Code Review Process

### For Contributors

1. **Self-review your changes** before requesting review
2. **Respond to feedback** promptly and constructively
3. **Mark conversations as resolved** after addressing comments
4. **Request re-review** after making significant changes

### For Reviewers

Reviewers should verify:

- ✅ Code follows project patterns and style guidelines
- ✅ All tests pass in CI
- ✅ New features include appropriate tests
- ✅ Documentation is updated as needed
- ✅ Commits are signed off
- ✅ Commit messages follow the conventional format
- ✅ No hardcoded credentials or sensitive data
- ✅ Code is maintainable and well-documented
- ✅ No unnecessary dependencies added
- ✅ Branch protection rules are followed

### Requesting Changes

When requesting changes:

- Be specific and constructive
- Provide examples or suggestions
- Explain the reasoning behind the request
- Use GitHub's "Request Changes" feature for blocking issues
- Use "Comment" for non-blocking suggestions

### Approval Process

- At least **1 approving review** from a code owner (@Ryansutton370) is required
- All CI checks must pass (tests, linting, CodeQL analysis)
- All conversations should be resolved
- Once approved and checks pass, the PR can be merged

## For Maintainers

### Merging Pull Requests

1. Ensure all review comments are addressed
2. Verify CI checks are passing
3. Use "Squash and merge" for feature branches to keep history clean
4. Use "Rebase and merge" for linear history when appropriate
5. Delete the branch after merging

### Release Management

When preparing a release:

1. Update version numbers if applicable
2. Update CHANGELOG (if maintained)
3. Tag the release with semantic versioning
4. Create release notes summarizing changes

### Branch Protection Enforcement

**Important**: Administrators and maintainers are required to follow the same branch protection rules as all other contributors. This ensures:

- Code quality through peer review
- CI validation for all changes
- Audit trail for all modifications
- No accidental direct pushes to `main`

Even with admin privileges, always:
- Create a feature branch
- Open a pull request
- Wait for CI checks
- Get an approving review (from another maintainer if available)
- Merge through the PR interface

### Dependabot

- Dependabot is configured to create weekly PRs for dependency updates
- Review and merge Dependabot PRs promptly
- Check for breaking changes in major version updates
- Ensure tests pass before merging

## Questions or Issues?

If you have questions about contributing:

1. Check existing issues and pull requests
2. Review the [README.md](README.md) and this contributing guide
3. Open a new issue with the `question` label
4. For security concerns, see [SECURITY.md](SECURITY.md)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to CypressTemplateRyan! Your efforts help make test automation better for everyone.
