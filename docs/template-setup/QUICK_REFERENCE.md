# 🚀 Quick Reference Card

**Keep this handy for daily Git operations**

## 📋 Essential Commands

### Daily Workflow
```bash
# Check what's changed
git status

# Stage your changes
git add .

# Commit with message
git commit -m "Describe what you did"

# Push to GitHub
git push origin main
```

### Weekly Updates
```bash
# Save your work first
git add .
git commit -m "My progress before weekly update"

# Get instructor updates
git fetch upstream
git merge upstream/main

# Push combined changes
git push origin main
```

### Emergency Commands
```bash
# Undo last commit (if not pushed)
git reset --soft HEAD~1

# Discard changes to a file
git checkout -- filename.txt

# See commit history
git log --oneline

# Check your remotes
git remote -v
```

## 🔧 Setup Checklist

**One-time setup:**
- [ ] Use template to create your repository
- [ ] Clone to your computer
- [ ] Run `npm install`
- [ ] Add upstream remote
- [ ] Test with `npm run dev`

**Weekly routine:**
- [ ] Get instructor updates
- [ ] Resolve any conflicts
- [ ] Complete week's exercises
- [ ] Commit and push regularly

## 🆘 Quick Fixes

**Can't get updates:**
```bash
git remote add upstream https://github.com/INSTRUCTOR/REPO.git
```

**Merge conflicts:**
1. Open files with `<<<<<<<` markers in VS Code
2. Choose which version to keep
3. Remove conflict markers
4. `git add .` and `git commit`

**Broke something:**
```bash
git reflog  # Find working commit
git reset --hard COMMIT_HASH
```

## 📞 Need Help?

1. Check [Troubleshooting Guide](TROUBLESHOOTING_GUIDE.md)
2. Ask classmates in study group
3. Visit instructor office hours
4. Include error messages when asking for help

---
**Bookmark this page!** 🔖