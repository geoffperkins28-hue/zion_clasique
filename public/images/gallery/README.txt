GALLERY IMAGES — drop your photos here.

How the gallery works:
  - Each photo needs (a) the image file in THIS folder, and
    (b) a small JSON entry in  src/content/gallery/  describing it.

The JSON entry controls the alt text, category (for the filter), caption, and
display order. Example file  src/content/gallery/art-1.json :

    {
      "image": "art-1.jpg",          <-- filename in THIS folder
      "alt": "A resident painting during an art therapy session",
      "category": "art",             <-- art | music | dance | recreation |
                                         community | wellness | events
      "caption": "Expressing what words can't",
      "order": 1
    }

To add a NEW photo: drop the image here, then copy one of the existing JSON
files in src/content/gallery/ and edit the fields.

Recommended: ~1200px wide, 4:3 works best (they display in a uniform grid),
compressed to keep each under ~250KB.

Placeholder images for the 8 sample entries are already here — overwrite them
with your real photos using the SAME filenames (art-1.jpg, music-1.jpg, etc.),
or add your own and remove the samples you don't want.
