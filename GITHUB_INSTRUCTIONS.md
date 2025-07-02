# GitHub Push Instructions

We've provided multiple options to push your code to the GitHub repository at:
https://github.com/ggg436/earth-friendly-frontpage-now.git

## Option 1: Using the Provided Scripts

We've created three different scripts to help you push the code:

### Batch Script (Windows)
Run the batch script by double-clicking `push-to-github.bat` or running it from Command Prompt.

### PowerShell Script (Windows)
Run the PowerShell script by right-clicking `push-to-github.ps1` and selecting "Run with PowerShell" or running:
```
powershell -ExecutionPolicy Bypass -File push-to-github.ps1
```

### Python Script (Cross-platform)
Run the Python script by executing:
```
python push-to-github.py
```

## Option 2: Manual Git Commands

If you prefer to use Git commands directly, follow these steps:

1. Configure Git with your credentials:
```
git config --global user.name "Your GitHub Username"
git config --global user.email "your.email@example.com"
```

2. Add all files to the staging area:
```
git add .
```

3. Commit your changes:
```
git commit -m "Migrate from Supabase to Clerk and Neon PostgreSQL with mock implementations"
```

4. Add the remote repository (if not already added):
```
git remote add origin https://github.com/ggg436/earth-friendly-frontpage-now.git
```

5. Push to GitHub:
```
git push -u origin main
```
   - If the main branch doesn't exist, try `master` instead:
   ```
   git push -u origin master
   ```

## Option 3: Using GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Add the local repository (File > Add local repository)
4. Navigate to your project folder: `D:\mahesh\project-bolt-sb1-3rpagra1 (1)\project`
5. Click "Publish repository" and select the repository URL: `https://github.com/ggg436/earth-friendly-frontpage-now.git`
6. Click "Publish"

## Authentication

When pushing to GitHub, you'll need to authenticate with your GitHub credentials:

- Username: Your GitHub username
- Password: Your Personal Access Token (PAT)

### Creating a Personal Access Token

1. Go to [GitHub Settings > Developer Settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token"
3. Give it a name (e.g., "Eco-Friendly Project Push")
4. Select the "repo" scope
5. Click "Generate token"
6. Copy the token immediately (you won't be able to see it again)

Use this token as your password when pushing to GitHub.

## Troubleshooting

If you encounter issues:

1. **Authentication Errors**:
   - Make sure you're using a Personal Access Token as your password, not your GitHub password
   - Verify that your token has the "repo" scope

2. **Remote Already Exists**:
   - If you get an error that the remote already exists, you can update it:
   ```
   git remote set-url origin https://github.com/ggg436/earth-friendly-frontpage-now.git
   ```

3. **Branch Issues**:
   - If pushing to `main` fails, try pushing to `master`:
   ```
   git push -u origin master
   ``` 