
import cv2
import numpy as np

path = '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/kids-haircut-icon.png'
img = cv2.imread(path, cv2.IMREAD_UNCHANGED)

if img is None:
    print("Failed to load image")
else:
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
        print(f"Min alpha: {np.min(alpha)}")
        print(f"Max alpha: {np.max(alpha)}")
        print(f"Mean alpha: {np.mean(alpha)}")
    else:
        print("No alpha channel")
