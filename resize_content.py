
import cv2
import numpy as np
import os

# Icons to resize
targets = [
    'haircut-icon.png',
    'haircut-beard-icon.png'
]

base_path = '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/'
target_content_height = 470 # Match ~92% fill of lineup/kids icons
canvas_height = 512

def resize_icon_content(filename):
    path = os.path.join(base_path, filename)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return

    print(f"Processing {filename}...")
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    
    if img is None:
        print(f"Failed to load {path}")
        return

    # 1. Find content bounding box
    alpha = img[:, :, 3]
    coords = cv2.findNonZero(alpha)
    if coords is None:
        print("Empty image")
        return
        
    x, y, w, h = cv2.boundingRect(coords)
    print(f"  Original content: {w}x{h}")
    
    # 2. Crop to content
    content = img[y:y+h, x:x+w]
    
    # 3. Resize content to target height
    scale = target_content_height / h
    new_w = int(w * scale)
    new_h = target_content_height
    
    resized_content = cv2.resize(content, (new_w, new_h), interpolation=cv2.INTER_AREA)
    print(f"  Resized content: {new_w}x{new_h}")
    
    # 4. Create new canvas
    # Width should be enough to hold the content, maybe keep original aspect ratio of canvas?
    # Or just make it fit the content width + padding?
    # The previous standardize script made width proportional to 512 height.
    # Let's make the canvas width fit the new content width with some padding, 
    # or just center it in a canvas of similar aspect ratio.
    
    # Let's calculate a canvas width that maintains roughly the same padding ratio as before,
    # or just tight fit + padding.
    # Actually, the other icons have varying widths. 
    # Let's make the canvas width = new_content_width + (some padding).
    # But wait, the website uses object-contain, so the canvas size matters less as long as aspect ratio is reasonable.
    # However, to be safe, let's make the canvas width = new_content_width + 40px padding.
    
    canvas_width = new_w + 40
    
    # Create empty canvas (transparent)
    new_canvas = np.zeros((canvas_height, canvas_width, 4), dtype=np.uint8)
    
    # Center content
    y_offset = (canvas_height - new_h) // 2
    x_offset = (canvas_width - new_w) // 2
    
    new_canvas[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = resized_content
    
    # Save
    cv2.imwrite(path, new_canvas)
    print(f"Saved {filename}")

for icon in targets:
    resize_icon_content(icon)
