# Corsair Xeneon Edge Pages

Static pages for the Corsair Xeneon Edge iFrame. The launch page is named CheckPoint Zero and links to the Arc Raiders checklist and Image Pad.

## Requirements

- .NET 8 SDK (to build the tray app)
- Python 3 (only if you use manual start)

## Quick start (Windows)

Build a single-file exe:

```powershell
cd "<path-to-repo>"
dotnet publish .\tray-server\CorsairTray.csproj -c Release -r win-x64
```

Run:

```powershell
.\tray-server\bin\Release\net8.0-windows\win-x64\publish\CorsairTray.exe
```

Open:

- http://localhost:8080/start.html

## iCue iFrame

Use this in iCue to embed the page:

```html
<iframe
  src="http://localhost:8080/start.html"
  width="420"
  height="520"
  frameborder="0"
></iframe>
```

## Manual start (any shell)

```powershell
cd "<path-to-repo>"
python -m http.server 8080
```

## Tray app (Windows)

Notes:

- The publish output is a single, self-contained exe (the `.pdb` is optional).
- The tray icon uses `cp0 icon.png`, and pages are embedded in the exe.
- Right-click the tray icon and choose Quit to stop the server.

## Files

- `tray-server/`: Windows tray app that runs the local web server
- `start.html`: launch page with links
- `arc-raiders-todo.html`: checklist + notes
- `image-markup.html`: image drop/pick + draw/erase + zoom
