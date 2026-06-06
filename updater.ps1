$repo     = "norgon2/spicetify-sync"
$file     = "sync.js"
$dest     = "$env:APPDATA\spicetify\Extensions\sync.js"
$shaStore = "$env:APPDATA\spicetify\Extensions\.sync_sha"
$interval = 3600

$headers = @{ "User-Agent" = "SpicetifyAutoUpdater/1.0" }

while ($true) {
    try {
        $api    = "https://api.github.com/repos/$repo/commits?path=$file&per_page=1"
        $commit = (Invoke-RestMethod -Uri $api -Headers $headers -TimeoutSec 30)[0]
        $sha    = $commit.sha

        $stored = if (Test-Path $shaStore) { (Get-Content $shaStore -Raw).Trim() } else { "" }

        if ($sha -ne $stored) {
            $raw = "https://raw.githubusercontent.com/$repo/main/$file"
            Invoke-WebRequest -Uri $raw -Headers $headers -OutFile $dest -TimeoutSec 60
            Set-Content -Path $shaStore -Value $sha -Encoding utf8
            & spicetify apply 2>$null
        }
    } catch { }

    Start-Sleep -Seconds $interval
}
