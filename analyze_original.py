
import cv2
import numpy as np

path = '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/kids-haircut-icon.png'
img = cv2.imread(path, cv2.IMREAD_UNCHANGED)

if img is None:
    print("Failed to load image")
else:
    print(f"Shape: {img.shape}")
    # Check center pixel
    h, w = img.shape[:2]
    center = img[h//2, w//2]
    print(f"Center pixel: {center}")
    
    # Check corners
    print(f"Top-left: {img[0,0]}")
    print(f"Bottom-right: {img[-1,-1]}")
    
    # Check unique colors count
    unique_colors = np.unique(img.reshape(-1, img.shape[2]), axis=0)
    print(f"Unique colors count: {len(unique_colors)}")
    
    # Check if there is any white
    white_mask = np.all(img[:,:,:3] > 200, axis=2)
    print(f"White pixels: {np.sum(white_mask)}")
