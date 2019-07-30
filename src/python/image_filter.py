import sys
import cv2
import os
#import matplot
# inputDir = '/mock/'
# outputDir = '/out/'
# fileName = 'xander2.jpg'
# failed = False

# def process(fileName, inputDir, outputDir):
#     # We need an absolute path
#     dir_path = os.path.dirname(os.path.realpath(__file__))

#     # Load the image from disk
#     img = cv2.imread(dir_path+inputDir+fileName,0)
#     if img is None:
#         return False, "Image Failed to Load"

#     # Apply the Canny edge detection filter
#     filtered = cv2.Canny(img, 50, 50)
#     if filtered is None:
#         return False, "Image Failed To Filter"


#     # Write the image back to disk
#     out = cv2.imwrite(dir_path+outputDir+fileName, filtered)
#     if out == False:
#         return False, "Image Failed To Write"

#     return True, "Success"

# isSuccess, message = process(fileName, inputDir, outputDir)
# print(isSuccess)
# print(message)
# sys.stdout.flush()

# inputDir = '/mock/'
# outputDir = '/out/'
# fileName = 'xander2.jpg'
# failed = False

def process(inPath, outPath):
    # We need an absolute path
    # dir_path = os.path.dirname(os.path.realpath(__file__))

    # Load the image from disk
    print("inPath : " + inPath + " outPath : " + outPath)
    img = cv2.imread(inPath,0)
    if img is None:
        return False, "Image Failed to Load"

    # Apply the Canny edge detection filter
    filtered = cv2.Canny(img, 50, 50)
    if filtered is None:
        return False, "Image Failed To Filter"


    # Write the image back to disk
    out = cv2.imwrite(outPath, filtered)
    if out == False:
        return False, "Image Failed To Write"

    return True, "Success\n\tapplied filter on " + inPath + "\n\tresult stored in " + outPath

isSuccess, message = process(sys.argv[1], sys.argv[2])
print(message)
sys.stdout.flush()
exit(not isSuccess)