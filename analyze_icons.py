
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

print(f"{'Icon':<25} | {'Dimensions':<15} | {'Mean RGB (Visible)':<20} | {'Max RGB':<15}")
print("-" * 85)

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
        visible_mask = alpha > 20
        
        if np.sum(visible_mask) > 0:
            # Get RGB values of visible pixels
            bgr_pixels = img[visible_mask, :3]
            mean_bgr = np.mean(bgr_pixels, axis=0)
            max_bgr = np.max(bgr_pixels, axis=0)
            # Convert to RGB for display
            mean_rgb = f"({mean_bgr[2]:.1f}, {mean_bgr[1]:.1f}, {mean_bgr[0]:.1f})"
            max_rgb = f"({max_bgr[2]}, {max_bgr[1]}, {max_bgr[0]})"
        else:
            mean_rgb = "N/A"
            max_rgb = "N/A"
    else:
        mean_rgb = "No Alpha"
        max_rgb = "No Alpha"
        
    print(f"{icon:<25} | {w}x{h:<13} | {mean_rgb:<20} | {max_rgb:<15}")
