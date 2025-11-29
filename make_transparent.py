
import cv2
import numpy as np
import os

image_paths = [
    '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/haircut-icon.png',
    '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/haircut-beard-icon.png',
    '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/lineup-icon.png',
    '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/lineup-beard-icon.png',
    '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/kids-haircut-icon.png'
]

def make_transparent(path):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return

    print(f"Processing {path}...")
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    
    # Ensure 4 channels
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    
    # Create a 3-channel version for floodFill - MUST BE CONTIGUOUS COPY
    img_bgr = img[:, :, :3].copy()
    
    # Create a mask for flood fill
    h, w = img.shape[:2]
    processed_mask = np.zeros((h+2, w+2), np.uint8)
    
    # Flood fill from all corners
    seed_points = [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]
    
    # Tolerance
    loDiff = (10, 10, 10)
    upDiff = (10, 10, 10)
    
    for seed in seed_points:
        # Check if seed is already processed in mask (bit 1 set)
        if processed_mask[seed[1]+1, seed[0]+1] == 0:
            # Use FLOODFILL_MASK_ONLY
            cv2.floodFill(img_bgr, processed_mask, seed, (0,0,0), loDiff, upDiff, cv2.FLOODFILL_MASK_ONLY | (255 << 8))
            
    # Now processed_mask has 255 where the background is.
    final_mask = processed_mask[1:-1, 1:-1]
    
    # Set alpha to 0 where mask is 255
    img[final_mask == 255, 3] = 0
    
    # Save
    cv2.imwrite(path, img)
    print(f"Saved {path}")

for path in image_paths:
    make_transparent(path)
