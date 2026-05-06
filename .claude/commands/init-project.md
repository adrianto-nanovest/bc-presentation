Initialize this project with a standard structure by performing all the following steps:

## 1. Create root files

Create an empty `README.md` and `CLAUDE.md` file if it does not already exist.

## 2. Create docs folder structure

Create the following directories:

- `docs/brainstorms/`
- `docs/specs/`
- `docs/researches/`
- `docs/prompts/`
- `docs/examples/`
- `docs/plans/`
- `docs/references/`
- `docs/image-specs/`
- `assets`

## 3. Create .gitignore

Create a `.gitignore` file in the project root with the following content (only if it does not already exist):

```
# Python
__pycache__/
*.py[cod]
*.pyo
*.pyd
.Python
*.egg-info/
dist/
build/
.eggs/
*.whl
.venv/
venv/
env/

# Testing
.pytest_cache/
.coverage
htmlcov/

# Git worktrees
.worktrees/

# macOS
.DS_Store

# IDE
.idea/
.vscode/

# Credentials and secrets
*.env
credentials/
secrets/
```

## 4. Initialize git

Check if a `.git` directory exists in the project root. If it does not exist, run `git init` to initialize a new git repository.

## 5. Confirm completion

After all steps are done, print a summary of what was created or skipped (if files already existed).
