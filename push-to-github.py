#!/usr/bin/env python3
"""
GitHub Push Script
This script helps push code to GitHub using a personal access token.
"""

import os
import sys
import subprocess
import getpass
import time

def run_command(command, show_output=True):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, 
                               text=True, capture_output=True)
        if show_output and result.stdout:
            print(result.stdout)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        if show_output:
            print(f"Error: {e}")
            if e.stderr:
                print(e.stderr)
        return False, e.stderr

def main():
    """Main function to push code to GitHub"""
    print("\n===== GitHub Push Script =====\n")
    
    # Configure Git if needed
    print("Configuring Git...")
    username = input("Enter your GitHub username: ")
    email = input("Enter your GitHub email: ")
    
    run_command(f'git config --global user.name "{username}"')
    run_command(f'git config --global user.email "{email}"')
    
    # Add all files
    print("\nAdding all files to git...")
    run_command("git add .")
    
    # Commit changes
    print("\nCommitting changes...")
    run_command('git commit -m "Migrate from Supabase to Clerk and Neon PostgreSQL with mock implementations"')
    
    # Check if remote exists
    print("\nChecking remote repository...")
    success, output = run_command("git remote -v", show_output=False)
    
    if "origin" not in output:
        print("Adding remote repository...")
        run_command("git remote add origin https://github.com/ggg436/earth-friendly-frontpage-now.git")
    
    # Push to GitHub
    print("\n===== Pushing to GitHub =====\n")
    print("When prompted, enter your GitHub personal access token as password.")
    print("If you don't have a personal access token, create one at:")
    print("https://github.com/settings/tokens")
    
    input("\nPress Enter to continue...")
    
    # Try to push to main branch
    print("\nPushing to main branch...")
    success, _ = run_command("git push -u origin main", show_output=False)
    
    if success:
        print("Push successful!")
    else:
        print("Push to main failed, trying master branch...")
        success, _ = run_command("git push -u origin master", show_output=False)
        
        if success:
            print("Push successful!")
        else:
            print("Push failed. Please check your credentials and try again.")
            
            # Try with username and token in URL
            print("\nWould you like to try pushing with your token in the URL? (y/n)")
            choice = input("This is less secure but might work better: ")
            
            if choice.lower() == 'y':
                token = getpass.getpass("Enter your GitHub personal access token: ")
                remote_url = f"https://{username}:{token}@github.com/ggg436/earth-friendly-frontpage-now.git"
                
                run_command(f'git remote set-url origin "{remote_url}"')
                success, _ = run_command("git push -u origin main", show_output=False)
                
                if success:
                    print("Push successful!")
                else:
                    print("Push failed. Please check your credentials and try again.")
    
    print("\nPress Enter to exit...")
    input()

if __name__ == "__main__":
    main() 