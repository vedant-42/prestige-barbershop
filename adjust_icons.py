
import cv2

# Crop kids haircut icon from bottom
kids_path = '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/kids-haircut-icon.png'
img = cv2.imread(kids_path, cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]
print(f"Kids haircut original: {w}x{h}")

# Crop bottom 15%
new_h = int(h * 0.85)
cropped_img = img[:new_h, :]
print(f"Kids haircut cropped: {cropped_img.shape[1]}x{cropped_img.shape[0]}")
cv2.imwrite(kids_path, cropped_img)
print(f"Saved cropped kids-haircut-icon.png")

# Resize lineup-beard icon to be smaller
lineup_beard_path = '/Users/vedant/coding_projects/AAA/prestige-barbershop/public/services/lineup-beard-icon.png'
img2 = cv2.imread(lineup_beard_path, cv2.IMREAD_UNCHANGED)
h2, w2 = img2.shape[:2]
print(f"\nLineup & Beard original: {w2}x{h2}")

# Resize to 70% of original size
new_w2 = int(w2 * 0.7)
new_h2 = int(h2 * 0.7)
resized_img = cv2.resize(img2, (new_w2, new_h2), interpolation=cv2.INTER_AREA)
print(f"Lineup & Beard resized: {new_w2}x{new_h2}")
cv2.imwrite(lineup_beard_path, resized_img)
print(f"Saved resized lineup-beard-icon.png")
