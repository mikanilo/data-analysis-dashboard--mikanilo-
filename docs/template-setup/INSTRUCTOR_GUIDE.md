# 📚 Instructor Guide: Managing the GitHub Template Repository

**Complete guide for managing student distributions, weekly updates, and support**

## 🏗️ Initial Repository Setup

### Step 1: Convert Repository to Template
1. **Go to your repository on GitHub**
2. **Click Settings** (top right of repo page)
3. **Scroll down to "Template repository"**
4. **Check "Template repository"** checkbox
5. **Save changes**

### Step 2: Set Up Branch Protection (Optional but Recommended)
1. **Go to Settings → Branches**
2. **Add rule for `main` branch**
3. **Enable:**
   - Require pull request reviews before merging
   - Dismiss stale PR approvals when new commits are pushed
   - Require status checks to pass before merging

### Step 3: Create Initial Release
```bash
# Tag the current state as Week 1
git tag -a v1.0-week1 -m "Week 1: Initial project setup"
git push origin v1.0-week1
```

## 📅 Weekly Update Workflow

### Before Each Week: Prepare Updates

#### 1. Create Weekly Branch
```bash
# Create and switch to weekly branch
git checkout -b week-2-updates
```

#### 2. Make Your Improvements
- Add new features or documentation
- Fix any issues from previous week
- Update example files or sample data
- Enhance existing components

#### 3. Document Changes
Create or update `CHANGELOG.md`:
```markdown
## Week 2 Updates (v1.1-week2)

### New Features
- Enhanced data upload validation
- Added loading states to components
- Improved error handling in DataUpload component

### Bug Fixes
- Fixed CSV parsing issue with special characters
- Resolved styling conflicts in mobile view

### Documentation
- Added Week 2 exercises
- Updated troubleshooting guide

### Files Changed
- `src/components/DataUpload.tsx` - Enhanced validation
- `src/utils/dataAnalysis.ts` - Improved error handling
- `docs/weekly-exercises/week2-exercises.md` - New exercises
```

#### 4. Merge and Release
```bash
# Switch back to main
git checkout main

# Merge weekly updates
git merge week-2-updates

# Create release tag
git tag -a v1.1-week2 -m "Week 2: Enhanced data handling and validation"

# Push everything
git push origin main
git push origin v1.1-week2

# Clean up
git branch -d week-2-updates
```

### Create GitHub Release
1. **Go to Releases on GitHub**
2. **Click "Create a new release"**
3. **Choose your tag** (e.g., v1.1-week2)
4. **Title:** "Week 2: Enhanced Data Handling"
5. **Description:** Copy from CHANGELOG.md
6. **Publish release**

## 🎯 Student Management Strategies

### Distribution Methods

#### Method 1: Direct Template Usage (Recommended)
- Students use GitHub's "Use this template" button
- Each student gets independent repository
- No permission management needed
- Students can make their repos private if desired

#### Method 2: GitHub Classroom Integration
- Set up GitHub Classroom assignment
- Use template repository as assignment template
- Automatic student repository creation
- Built-in grading and feedback tools

### Student Onboarding Checklist
- [ ] Provide template repository link
- [ ] Share student setup guide
- [ ] Verify students can clone and run project
- [ ] Check students have upstream remote configured
- [ ] Test update process with sample change

## 🔧 Handling Student Issues

### Common Student Problems

#### 1. "Can't see instructor updates"
**Diagnosis:** Missing upstream remote
**Solution:** 
```bash
git remote add upstream https://github.com/INSTRUCTOR/REPO.git
```

#### 2. "Merge conflicts when updating"
**Diagnosis:** Student modified files you also changed
**Solution:** Guide them through conflict resolution or provide reset instructions

#### 3. "My changes disappeared"
**Diagnosis:** Incorrect merge or reset
**Solution:** Use `git reflog` to recover lost commits

#### 4. "Project won't run after update"
**Diagnosis:** Dependency changes or breaking updates
**Solution:** Provide step-by-step fix in weekly announcement

### Support Strategies

#### 1. Proactive Communication
- Send weekly update emails with:
  - What's new this week
  - How to get updates
  - Common issues and solutions
  - Preview of next week

#### 2. Office Hours Protocol
- Dedicated time for Git/GitHub issues
- Screen sharing for complex problems
- Document common solutions

#### 3. Peer Support System
- Encourage students to help each other
- Create class Discord/Slack for quick questions
- Assign "Git helpers" among more experienced students

## 📊 Monitoring and Analytics

### Track Student Progress
1. **Repository Activity:** Monitor commits and pushes
2. **Release Downloads:** See who's getting updates
3. **Issue Reports:** Track common problems
4. **Pull Requests:** If students submit improvements

### Useful Monitoring Commands
```bash
# See who has forked/used your template
# (Check GitHub Insights → Traffic → Git clones)

# Monitor your repository activity
git log --oneline --since="1 week ago"

# Check tag/release downloads
# (Available in GitHub repository insights)
```

## 🚨 Emergency Procedures

### Critical Bug in Released Code
1. **Create hotfix branch immediately**
```bash
git checkout -b hotfix-critical-bug
# Fix the issue
git checkout main
git merge hotfix-critical-bug
git tag -a v1.1.1-hotfix -m "Critical bug fix"
git push origin main
git push origin v1.1.1-hotfix
```

2. **Notify students immediately** with:
   - Description of the problem
   - Impact on their work
   - Exact steps to get the fix
   - Apology and timeline for resolution

### Student Accidentally Breaks Their Copy
Provide "nuclear option" reset:
```bash
# Complete reset to instructor's latest
git fetch upstream
git reset --hard upstream/main
git push origin main --force
```

## 📈 Continuous Improvement

### Collect Feedback
- Weekly anonymous surveys about updates
- End-of-semester retrospective
- Track which updates cause the most issues

### Update Quality Checklist
- [ ] Tested on clean environment
- [ ] Updated documentation
- [ ] Backward compatible when possible
- [ ] Clear commit messages
- [ ] Tagged and released
- [ ] Students notified

### Semester Planning
- Plan major features for specific weeks
- Buffer weeks for catch-up and consolidation
- Final weeks focus on polish and deployment
- Keep breaking changes to minimum

## 🎉 Success Metrics

### Repository Health
- Students successfully getting weekly updates
- Low number of support tickets
- High engagement with new features
- Positive feedback on improvements

### Student Success Indicators
- Regular commits to their repositories
- Successful project deployments
- Participation in peer help
- Creative extensions of base project

Remember: The goal is empowering students to learn and grow, not creating dependency on instructor support. Focus on clear documentation and gradual skill building.