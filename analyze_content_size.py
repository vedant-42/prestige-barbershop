
import cv2
import numpy as np
import os

icons = [
    'haircut-icon.png',
    'haircut-beard-icon.png',
    'kids-haircut-icon.png',
    'lineup-icon.png',
    'lineup-beard-icon.png'
]

base_path = '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/'

print(f"{'Icon':<25} | {'Canvas':<10} | {'Content Box':<15} | {'Content Height':<15} | {'Fill %':<10}")
print("-" * 90)

for icon in icons:
    path = os.path.join(base_path, icon)
    if not os.path.exists(path):
        print(f"{icon:<25} | Not Found")
        continue
        
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"{icon:<25} | Failed to load")
        continue
        
    h, w = img.shape[:2]
    
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
        # Find bounding box of non-zero alpha
        coords = cv2.findNonZero(alpha)
        if coords is not None:
            x, y, w_content, h_content = cv2.boundingRect(coords)
            fill_pct = (h_content / h) * 100
            print(f"{icon:<25} | {w}x{h:<6} | {w_content}x{h_content:<11} | {h_content:<15} | {fill_pct:.1f}%")
        else:
            print(f"{icon:<25} | {w}x{h:<6} | Empty           | 0               | 0.0%")
    else:
        print(f"{icon:<25} | {w}x{h:<6} | No Alpha        | N/A             | N/A")
