$root = Join-Path $PSScriptRoot "..\src" | Resolve-Path
Get-ChildItem $root -Recurse -Include *.astro, *.css | ForEach-Object {
  $p = $_.FullName
  $t = [System.IO.File]::ReadAllText($p)
  $o = $t
  $t = $t -replace '\bbg-white/95\b', 'bg-surface-raised/95'
  $t = $t -replace '\bbg-white/90\b', 'bg-surface-raised/90'
  $t = $t -replace '\bring-offset-white\b', 'ring-offset-surface-raised'
  $t = $t -replace '\bborder-gray-200/90\b', 'border-border-strong/90'
  $t = $t -replace '\bborder-gray-100\b', 'border-border-subtle'
  $t = $t -replace '\bborder-gray-200\b', 'border-border-strong'
  $t = $t -replace '\bborder-gray-300\b', 'border-border-strong'
  $t = $t -replace '\bdivide-gray-50\b', 'divide-border-subtle'
  $t = $t -replace '\bdivide-gray-100\b', 'divide-border-subtle'
  $t = $t -replace '\bbg-gray-50\b', 'bg-surface-muted'
  $t = $t -replace '\bhover:bg-gray-50\b', 'hover:bg-surface-muted'
  $t = $t -replace '\bbg-gray-100\b', 'bg-surface-muted'
  $t = $t -replace '\bhover:bg-gray-200\b', 'hover:bg-border-subtle'
  $t = $t -replace '\btext-gray-700\b', 'text-ink-secondary'
  $t = $t -replace '\btext-gray-600\b', 'text-ink-secondary'
  $t = $t -replace '\btext-gray-800\b', 'text-ink-primary'
  $t = $t -replace '\btext-gray-500\b', 'text-ink-tertiary'
  $t = $t -replace '\btext-gray-400\b', 'text-ink-tertiary'
  $t = $t -replace '\bbg-white\b', 'bg-surface-raised'
  $t = $t -replace '\bhover:bg-white\b', 'hover:bg-surface-raised'
  if ($t -ne $o) {
    [System.IO.File]::WriteAllText($p, $t, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Updated: $p"
  }
}
