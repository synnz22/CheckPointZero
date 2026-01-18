# Corsair Xeneon Edge Pages

Simple static pages intended for use inside a Corsair Xeneon Edge iFrame. The start page (CheckPoint Zero) links to the Arc Raiders checklist and Image Pad.

## Requirements

- Python 3 (for the local web server)

## Run locally

Install requirements:

```bat
install requirements.bat
```

Option A: batch file (Windows)

```bat
list start.bat
```

Option B: manual

```powershell
cd "<path-to-repo>"
python -m http.server 8080
```

Then open:

- http://localhost:8080/start.html

## Files

- `install requirements.bat`: check for Python and install pip requirements if present
- `list start.bat`: start the local web server
- `start.html`: launch page with links
- `arc-raiders-todo.html`: checklist + notes
- `image-markup.html`: image drop/pick + draw/erase + zoom
