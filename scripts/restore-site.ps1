# =============================================================================
# RESTORE SITE — Take Orient Relais out of maintenance mode.
# =============================================================================
# Run this script the moment the devis is signed AND the acompte has cleared.
#
# What it does:
#   1. Verifies you are in the project root and on master
#   2. Pulls the latest master to make sure you are not behind
#   3. Removes middleware.ts (the maintenance gate)
#   4. Commits the deletion
#   5. Pushes -> Vercel auto-deploys in ~1-2 minutes
#   6. Polls the homepage until it returns 200 OK
#
# Usage:
#   pwsh .\scripts\restore-site.ps1
# Or right-click -> Run with PowerShell
# =============================================================================

$ErrorActionPreference = "Stop"

# --- Resolve project root --------------------------------------------------
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $projectRoot
Write-Host ""
Write-Host "Project root: $projectRoot" -ForegroundColor DarkGray

# --- Check git state -------------------------------------------------------
$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($branch -ne "master") {
    Write-Host "ERROR: You are on branch '$branch', not 'master'." -ForegroundColor Red
    Write-Host "       Run 'git checkout master' first." -ForegroundColor Red
    exit 1
}

$dirty = git status --porcelain
if ($dirty) {
    Write-Host "ERROR: Working tree is not clean. Commit or stash first:" -ForegroundColor Red
    Write-Host $dirty
    exit 1
}

# --- Sync with remote ------------------------------------------------------
Write-Host "Pulling latest master..." -ForegroundColor Cyan
git pull --ff-only origin master | Out-Null

# --- Check that maintenance is actually active ----------------------------
if (-not (Test-Path "middleware.ts")) {
    Write-Host ""
    Write-Host "Maintenance middleware is already absent." -ForegroundColor Yellow
    Write-Host "Site is NOT in maintenance mode. Nothing to restore." -ForegroundColor Yellow
    exit 0
}

# --- Confirm with user ----------------------------------------------------
Write-Host ""
Write-Host "About to RESTORE the production site." -ForegroundColor Yellow
Write-Host "This will:" -ForegroundColor Yellow
Write-Host "  - Delete middleware.ts" -ForegroundColor Yellow
Write-Host "  - Commit on master" -ForegroundColor Yellow
Write-Host "  - Push to origin (Vercel will redeploy)" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Type 'restore' to proceed"
if ($confirm -ne "restore") {
    Write-Host "Cancelled." -ForegroundColor Red
    exit 1
}

# --- Remove middleware + commit + push ------------------------------------
Write-Host ""
Write-Host "Removing middleware.ts..." -ForegroundColor Cyan
Remove-Item "middleware.ts" -Force

git add middleware.ts
git commit -m "chore(maintenance): restore site after contract finalization" | Out-Null

Write-Host "Pushing to origin/master..." -ForegroundColor Cyan
git push origin master

Write-Host ""
Write-Host "Push complete. Vercel will redeploy in ~1-2 minutes." -ForegroundColor Green

# --- Poll the homepage until it answers 200 -------------------------------
Write-Host ""
Write-Host "Waiting for the new deployment..." -ForegroundColor Cyan
$deadline = (Get-Date).AddMinutes(5)
$ok = $false
while ((Get-Date) -lt $deadline) {
    try {
        $resp = Invoke-WebRequest -Uri "https://www.orient-relais.com" -Method Head -UseBasicParsing -TimeoutSec 10
        if ($resp.StatusCode -eq 200) {
            $ok = $true
            break
        }
        Write-Host "  ... still serving status $($resp.StatusCode)" -ForegroundColor DarkGray
    } catch {
        Write-Host "  ... still warming up" -ForegroundColor DarkGray
    }
    Start-Sleep -Seconds 15
}

Write-Host ""
if ($ok) {
    Write-Host "SITE RESTORED — https://www.orient-relais.com is live (HTTP 200)." -ForegroundColor Green
} else {
    Write-Host "Push complete but site has not returned 200 yet within 5 minutes." -ForegroundColor Yellow
    Write-Host "Check the Vercel dashboard:" -ForegroundColor Yellow
    Write-Host "  https://vercel.com/dashboard" -ForegroundColor Yellow
}
