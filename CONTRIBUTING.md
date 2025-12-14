# Contributing to Cypress Test Automation Template

Thank you for your interest in contributing to this project! This document provides guidelines and workflows for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Contribution Workflow](#contribution-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Guidelines](#commit-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation Updates](#documentation-updates)
- [Pull Request Process](#pull-request-process)
- [Review Guidelines](#review-guidelines)
- [Maintainer Guidelines](#maintainer-guidelines)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- A GitHub account

### Fork and Clone

This repository is public and forkable. The `main` branch is protected and requires pull requests, code review, and passing CI checks. **Direct pushes to `main` are not allowed**, even for administrators.

1. **Fork the repository** on GitHub by clicking the "Fork" button
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CypressTemplateRyan.git
   cd CypressTemplateRyan
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/Ryansutton370/CypressTemplateRyan.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

### Keep Your Fork Updated

Before starting work, sync your fork with the upstream repository:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

## Contribution Workflow

Follow this workflow to contribute changes:

1. **Create a new branch** from `main` for your work:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b your-branch-name
   ```

2. **Make your changes** following the project's coding standards

3. **Test your changes** locally (see [Testing Requirements](#testing-requirements))

4. **Commit your changes** with a clear commit message (see [Commit Guidelines](#commit-guidelines))

5. **Push to your fork**:
   ```bash
   git push origin your-branch-name
   ```

6. **Open a Pull Request** from your fork's branch to the upstream `main` branch

7. **Address review feedback** by making additional commits to your branch

8. **Wait for CI checks** to pass and for a maintainer to approve your PR

## Branch Naming Convention

Use descriptive branch names that indicate the type and purpose of your changes:

- `feature/description` - For new features (e.g., `feature/add-login-test`)
- `fix/description` - For bug fixes (e.g., `fix/incorrect-selector`)
- `docs/description` - For documentation updates (e.g., `docs/update-readme`)
- `refactor/description` - For code refactoring (e.g., `refactor/simplify-actions`)
- `test/description` - For adding or updating tests (e.g., `test/add-api-coverage`)
- `chore/description` - For maintenance tasks (e.g., `chore/update-dependencies`)

## Commit Guidelines

### Commit Message Format

Follow this format for commit messages:

```
<type>: <short summary>

<optional detailed description>

<optional footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build config, etc.)

**Examples:**
```
feat: add Wikipedia search test scenario

fix: correct selector for login button

docs: update contributing guidelines

test: add coverage for CRUD operations
```

### Commit Signoff Requirement

All commits must be signed off to indicate that you agree to the [Developer Certificate of Origin (DCO)](https://developercertificate.org/).

**Option 1: Sign commits using the command line**

Add `-s` or `--signoff` to your commit command:
```bash
git commit -s -m "feat: add new feature"
```

This adds a "Signed-off-by" line to your commit message:
```
Signed-off-by: Your Name <your.email@example.com>
```

**Option 2: Use the GitHub web UI**

When creating or editing files through the GitHub web interface, there is a signoff checkbox at the bottom of the commit form. Make sure to check this box.

## Testing Requirements

All contributions must include appropriate tests and pass existing tests.

### Running Tests Locally

Before submitting a PR, run the test suite:

```bash
# Run all tests
npm test

# Run tests in interactive mode
npx cypress open

# Run specific feature file
npx cypress run --spec "cypress/integration/features/YourFeature.feature"
```

### Test Requirements

- **New features** must include new test scenarios in feature files
- **Bug fixes** should include a test that reproduces the bug and validates the fix
- **All tests must pass** before the PR can be merged
- **Maintain test coverage** - don't remove existing tests unless absolutely necessary

### Writing Tests

Follow the existing patterns in the project:

1. Create or update `.feature` files in `cypress/integration/features/`
2. Add step definitions in `cypress/support/step_definitions/`
3. Use Page Objects for element locators
4. Follow BDD/Gherkin best practices

## Documentation Updates

Update documentation when making changes:

- **README.md** - Update if adding new features, changing workflows, or modifying setup
- **Code comments** - Add comments for complex logic or non-obvious implementations
- **Feature files** - Ensure Gherkin scenarios are clear and well-documented
- **Type definitions** - Update TypeScript types when modifying interfaces

### Documentation Standards

- Use clear, concise language
- Provide examples where helpful
- Keep formatting consistent with existing documentation
- Run spell check before submitting

## Pull Request Process

### Before Opening a PR

1. ✅ Ensure all tests pass locally
2. ✅ Run the linter (if configured)
3. ✅ Update documentation as needed
4. ✅ Sign your commits
5. ✅ Rebase on latest `main` if needed

### Opening a PR

1. **Use the PR template** - Fill out all sections of the pull request template
2. **Link related issues** - Reference any related issues using `Fixes #123` or `Relates to #456`
3. **Provide context** - Explain what changes you made and why
4. **Include testing steps** - Describe how reviewers can test your changes
5. **Check CI status** - Ensure all automated checks pass

### PR Title Format

Follow the same format as commit messages:
```
<type>: <short summary>
```

Examples:
- `feat: add support for drag and drop actions`
- `fix: resolve flaky test in login scenario`
- `docs: improve API testing documentation`

## Review Guidelines

### For Contributors

When your PR receives review comments:

- **Respond promptly** to questions and feedback
- **Be open to suggestions** and willing to make changes
- **Ask for clarification** if feedback is unclear
- **Push additional commits** to address feedback (no need to force-push)
- **Re-request review** after addressing all comments

### For Reviewers

When reviewing PRs, check for:

- ✅ **Functionality** - Does the change work as intended?
- ✅ **Tests** - Are there adequate tests? Do all tests pass?
- ✅ **Code quality** - Is the code clean, maintainable, and following project patterns?
- ✅ **Documentation** - Is documentation updated appropriately?
- ✅ **Breaking changes** - Are there any breaking changes? Are they necessary and documented?
- ✅ **Security** - Are there any security concerns?
- ✅ **Performance** - Are there any performance implications?

#### Requesting Changes

- **Be constructive** and provide clear explanations
- **Suggest solutions** when pointing out problems
- **Distinguish between required changes and suggestions** (use "nit:" prefix for minor/optional suggestions)
- **Approve** once all required changes are addressed

## Maintainer Guidelines

### Responsibilities

Maintainers are responsible for:

- Reviewing and merging pull requests
- Maintaining code quality and consistency
- Managing releases and versioning
- Responding to issues and questions
- Enforcing the Code of Conduct

### Merging PRs

Before merging a PR, ensure:

1. ✅ At least one approving review from a CODEOWNER
2. ✅ All CI checks pass (tests, linting, security scans)
3. ✅ All review comments are resolved
4. ✅ Commits are signed off
5. ✅ Documentation is updated
6. ✅ Branch is up to date with `main`

Use **squash and merge** for most PRs to maintain a clean commit history. Use regular merge for large feature branches if preserving history is important.

### Branch Protection Enforcement

**Important:** Repository administrators are required to follow the same branch protection rules as all other contributors. This means:

- Admins **cannot** push directly to `main`
- Admins **must** create PRs for their changes
- Admins **must** wait for required reviews and CI checks
- Admins **must** follow the same commit signoff requirements

Branch protection rules are enforced through GitHub's branch protection settings and CODEOWNERS file.

## Questions?

If you have questions about contributing, please:

1. Check the [README.md](README.md) for general project information
2. Search existing [issues](https://github.com/Ryansutton370/CypressTemplateRyan/issues) for similar questions
3. Open a new issue with the "question" label

Thank you for contributing! 🎉
