
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
target_height = 512

def standardize_icon(filename):
    path = os.path.join(base_path, filename)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return

    print(f"Processing {filename}...")
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    
    if img is None:
        print(f"Failed to load {path}")
        return

    # 1. Resize to target height
    h, w = img.shape[:2]
    scale = target_height / h
    new_w = int(w * scale)
    img = cv2.resize(img, (new_w, target_height), interpolation=cv2.INTER_AREA)
    
    # 2. Normalize Brightness
    if img.shape[2] == 4:
        # Split channels
        b, g, r, a = cv2.split(img)
        
        # Create a mask of visible pixels
        visible_mask = a > 20
        
        if np.sum(visible_mask) > 0:
            # Convert to grayscale to remove color casts
            gray = cv2.cvtColor(img, cv2.COLOR_BGRA2GRAY)
            
            # Get the visible pixels
            visible_pixels = gray[visible_mask]
            
            # Calculate current stats
            min_val = np.min(visible_pixels)
            max_val = np.max(visible_pixels)
            
            print(f"  Original range: {min_val} - {max_val}")
            
            # Target range: Map darkest visible pixel to ~50 and brightest to 255
            # This ensures "silver" look without being too dark
            
            # Linear stretching
            # out = (in - min) * (target_max - target_min) / (max - min) + target_min
            
            target_min = 50
            target_max = 255
            
            # Avoid division by zero
            if max_val > min_val:
                alpha_scale = (target_max - target_min) / (max_val - min_val)
                beta = target_min - min_val * alpha_scale
                
                normalized_gray = cv2.convertScaleAbs(gray, alpha=alpha_scale, beta=beta)
            else:
                normalized_gray = gray
                
            # Reconstruct image
            # Use the normalized gray for all 3 color channels to ensure neutral silver/white
            img = cv2.merge([normalized_gray, normalized_gray, normalized_gray, a])
            
            # Verify new max
            new_max = np.max(img[visible_mask, 0])
            print(f"  New max brightness: {new_max}")
            
    cv2.imwrite(path, img)
    print(f"Saved {filename}")

for icon in icons:
    standardize_icon(icon)
